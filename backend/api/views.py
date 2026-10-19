
import json
import os

import stripe
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST
from datetime import timedelta

from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.utils import timezone
import uuid 

from .r2_storage import get_r2_bucket_name, get_r2_client

from .models import TimeCapsule

import logging

logger = logging.getLogger(__name__)

@csrf_exempt
@require_POST
def create_checkout_session(request):
    stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")

    if not stripe.api_key:
        return JsonResponse(
            {"error": "Stripe is not configured yet."},
            status=503,
        )

    try:
        data = json.loads(request.body or "{}")
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse(
            {"error": "Invalid request."},
            status=400,
        )

    edition = data.get("edition")

    lookup_keys = {
        "digital": "digital",
        "physical": "physical",
    }

    if edition not in lookup_keys:
        return JsonResponse(
            {"error": "Please select a valid edition."},
            status=400,
        )

    try:
        prices = stripe.Price.list(
            lookup_keys=[lookup_keys[edition]],
            active=True,
            limit=1,
        )

        if not prices.data:
            return JsonResponse(
                {"error": "The selected price was not found in Stripe."},
                status=503,
            )

        price = prices.data[0]

        frontend_url = os.environ.get(
            "FRONTEND_URL",
            "http://localhost:5173",
        ).rstrip("/")

        checkout_options = {
            "mode": "payment",
            "line_items": [
                {
                    "price": price.id,
                    "quantity": 1,
                }
            ],
            "success_url": (
                f"{frontend_url}/purchase-success"
                "?session_id={CHECKOUT_SESSION_ID}"
            ),
            "cancel_url": f"{frontend_url}/Shop",
            "metadata": {
                "product": "coloring-the-cosmo-journal",
                "edition": edition,
            },
        }

        if edition == "physical":
            checkout_options["shipping_address_collection"] = {
                "allowed_countries": ["GB"],
            }

        session = stripe.checkout.Session.create(
            **checkout_options
        )

        return JsonResponse({"url": session.url})

    except stripe.StripeError:
        logger.exception("Stripe checkout session creation failed")
        return JsonResponse(

            {
                "error": (
                    "Unable to start checkout. "
                    "Please try again."
                )
            },
            status=502,
        )



@require_GET
def verify_checkout_session(request):
    session_id = request.GET.get("session_id", "").strip()

    if not session_id:
        return JsonResponse(
            {"error": "Missing checkout session ID."},
            status=400,
        )

    stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")

    if not stripe.api_key:
        return JsonResponse(
            {"error": "Stripe is not configured."},
            status=503,
        )

    try:
        session = stripe.checkout.Session.retrieve(session_id)

        # Convert Stripe's Session object to a regular Python dictionary.
        session_data = session.to_dict()
        metadata = session_data.get("metadata") or {}

        if session_data.get("mode") != "payment":
            return JsonResponse(
                {"error": "Invalid checkout session."},
                status=400,
            )

        if session_data.get("payment_status") != "paid":
            return JsonResponse({"paid": False})

        return JsonResponse({
            "paid": True,
            "product": metadata.get("product"),
            "edition": metadata.get("edition"),
        })

    except stripe.StripeError:
        logger.exception("Stripe checkout session creation failed")

        return JsonResponse(
            {"error": "Unable to start checkout. Please try again."},
            status=502,
        )

        

        # Do not confirm an unpaid or incomplete checkout.
        if session.payment_status != "paid":
            return JsonResponse({"paid": False})

        return JsonResponse({
            "paid": True,
            "edition": session.metadata.get("edition"),
        })

    except stripe.StripeError:
        logger.exception("Stripe checkout session verification failed")
        return JsonResponse(
            {"error": "Unable to verify payment."},
            status=502,
        )


def get_capsule_delivery_date(delivery_option):
    now = timezone.now()

    if delivery_option == "1_hour":
        return now + timedelta(hours=1)

    if delivery_option == "1_day":
        return now + timedelta(days=1)

    if delivery_option == "30_days":
        return now + timedelta(days=30)

    years = {
        "1_year": 1,
        "3_years": 3,
    }

    year_count = years.get(delivery_option)

    if year_count is None:
        return None

    try:
        return now.replace(year=now.year + year_count)
    except ValueError:
        return now.replace(
            year=now.year + year_count,
            day=28,
        )


@csrf_exempt
@require_POST
def create_time_capsule(request):
    try:
        data = json.loads(request.body or "{}")
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse(
            {"error": "Invalid request data."},
            status=400,
        )

    capsule_type = data.get(
        "capsuleType",
        data.get("capsule_type", "letter"),
    )

    # Video capsules will be connected after payment and storage
    # have been implemented.
    if capsule_type != "letter":
        return JsonResponse(
            {
                "error": (
                    "Video capsules are not available through "
                    "this endpoint yet."
                )
            },
            status=400,
        )

    title = str(data.get("title", "")).strip()
    recipient_email = str(
        data.get("recipientEmail", data.get("recipient_email", ""))
    ).strip()
    message = str(data.get("message", "")).strip()

    delivery_option = str(
        data.get("duration", data.get("delivery_option", ""))
    ).strip().lower()

    # Accept common formats sent by the frontend.
    delivery_options = {
        "1 hour": "1_hour",
"1-hour": "1_hour",
"1_hour": "1_hour",
        "1 day": "1_day",
        "1-day": "1_day",
        "1_day": "1_day",
        "30 days": "30_days",
        "30-days": "30_days",
        "30_days": "30_days",
        "1 year": "1_year",
        "1-year": "1_year",
        "1_year": "1_year",
        "3 years": "3_years",
        "3-years": "3_years",
        "3_years": "3_years",
    }

    delivery_option = delivery_options.get(delivery_option)

    if not title:
        return JsonResponse(
            {"error": "Please enter a capsule title."},
            status=400,
        )

    if len(title) > 150:
        return JsonResponse(
            {"error": "The title must be 150 characters or fewer."},
            status=400,
        )

    try:
        validate_email(recipient_email)
    except ValidationError:
        return JsonResponse(
            {"error": "Please enter a valid recipient email address."},
            status=400,
        )

    if delivery_option is None:
        return JsonResponse(
            {"error": "Please select a valid delivery time."},
            status=400,
        )

    delivery_at = get_capsule_delivery_date(delivery_option)

    capsule = TimeCapsule.objects.create(
        title=title,
        capsule_type="letter",
        message=message,
        recipient_email=recipient_email,
        delivery_option=delivery_option,
        delivery_at=delivery_at,
        payment_status="free",
    )

    return JsonResponse(
        {
            "success": True,
            "message": "Your letter capsule has been saved.",
            "capsule_id": capsule.id,
            "delivery_at": capsule.delivery_at.isoformat(),
        },
        status=201,
    )


@csrf_exempt
@require_POST
def upload_time_capsule_video(request):
    """Upload a video capsule to private R2 storage and save its pending record."""

    title = request.POST.get("title", "").strip()
    message = request.POST.get("message", "").strip()
    recipient_email = request.POST.get("recipient_email", "").strip()
    duration = request.POST.get("duration", "").strip()
    video_file = request.FILES.get("video")

    # Accept the duration values used by the frontend.
    duration_options = {
        "1 hour": "1_hour",
"1-hour": "1_hour",
"1_hour": "1_hour",
        "1day": "1_day",
        "1_day": "1_day",
        "30days": "30_days",
        "30_days": "30_days",
        "1year": "1_year",
        "1_year": "1_year",
        "3years": "3_years",
        "3_years": "3_years",
    }
    delivery_option = duration_options.get(duration)

    if not title:
        return JsonResponse({"error": "Please enter a title."}, status=400)

    if len(title) > 150:
        return JsonResponse(
            {"error": "The title must be 150 characters or fewer."},
            status=400,
        )

    try:
        validate_email(recipient_email)
    except ValidationError:
        return JsonResponse(
            {"error": "Please enter a valid recipient email address."},
            status=400,
        )

    if not delivery_option:
        return JsonResponse(
            {"error": "Please choose a valid delivery duration."},
            status=400,
        )

    if not video_file:
        return JsonResponse({"error": "Please attach a video."}, status=400)

    # Limit uploads to 100 MB.
    max_video_size = 100 * 1024 * 1024
    if video_file.size > max_video_size:
        return JsonResponse(
            {"error": "The video must be 100 MB or smaller."},
            status=400,
        )

    # MediaRecorder commonly produces WebM; also allow MP4 and QuickTime.
    content_type = (video_file.content_type or "").split(";")[0].lower()
    allowed_types = {
        "video/webm": "webm",
        "video/mp4": "mp4",
        "video/quicktime": "mov",
    }

    if content_type not in allowed_types:
        return JsonResponse(
            {"error": "Please upload a WebM, MP4 or MOV video."},
            status=400,
        )

    storage_key = f"time-capsules/{uuid.uuid4().hex}.{allowed_types[content_type]}"
    client = None
    bucket = None
    uploaded = False

    try:
        client = get_r2_client()
        bucket = get_r2_bucket_name()

        client.upload_fileobj(
            video_file,
            bucket,
            storage_key,
            ExtraArgs={"ContentType": content_type},
        )
        uploaded = True

        capsule = TimeCapsule.objects.create(
            title=title,
            capsule_type="video",
            message=message,
            recipient_email=recipient_email,
            delivery_option=delivery_option,
            delivery_at=get_capsule_delivery_date(delivery_option),
            video_storage_key=storage_key,
            payment_status="pending",
        )

        return JsonResponse(
            {
                "success": True,
                "capsule_id": capsule.id,
                "message": "Video uploaded and capsule saved. Payment is still pending.",
            },
            status=201,
        )

    
    except Exception:
        logger.exception("Time capsule video upload failed")

        # Remove the uploaded file if saving the capsule record failed.
        if uploaded and client and bucket:
            try:
                client.delete_object(
                    Bucket=bucket,
                    Key=storage_key,
                )
            except Exception:
                logger.exception(
                    "Could not delete orphaned R2 video"
                )

        return JsonResponse(
            {
                "error": (
                    "The video could not be saved. "
                    "Please try again."
                )
            },
            status=500,
        )


@csrf_exempt
@require_POST
def create_video_capsule_checkout_session(request):
    """Create Stripe Checkout for an existing pending video capsule."""
    stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")

    if not stripe.api_key:
        return JsonResponse(
            {"error": "Stripe is not configured."},
            status=503,
        )

    try:
        data = json.loads(request.body or "{}")
        capsule_id = data.get("capsule_id")
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse({"error": "Invalid request."}, status=400)

    if not capsule_id:
        return JsonResponse(
            {"error": "Missing video capsule ID."},
            status=400,
        )

    try:
        capsule = TimeCapsule.objects.get(
            id=capsule_id,
            capsule_type="video",
            payment_status="pending",
        )
    except (TimeCapsule.DoesNotExist, ValueError, TypeError):
        return JsonResponse(
            {"error": "Pending video capsule not found."},
            status=404,
        )

    if not capsule.video_storage_key:
        return JsonResponse(
            {"error": "This capsule has no saved video."},
            status=400,
        )

    frontend_url = os.environ.get(
        "FRONTEND_URL",
        "https://www.solayulm.co.uk",
    ).rstrip("/")

    try:
        prices = stripe.Price.list(
            lookup_keys=["video_capsule"],
            active=True,
            limit=1,
        )

        if not prices.data:
            return JsonResponse(
                {"error": "Video capsule price not found in Stripe."},
                status=503,
            )

        session = stripe.checkout.Session.create(
            mode="payment",
            line_items=[{
                "price": prices.data[0].id,
                "quantity": 1,
            }],
            success_url=(
            f"{frontend_url}/TimeCapsules"
            "?video_payment=success&session_id={CHECKOUT_SESSION_ID}"
            ),
            cancel_url=(
            f"{frontend_url}/TimeCapsules?"
            "video_payment=cancelled"
            ),
            client_reference_id=str(capsule.id),
            metadata={
                "product": "video-time-capsule",
                "capsule_id": str(capsule.id),
            },
        )

        capsule.stripe_session_id = session.id
        capsule.save(update_fields=["stripe_session_id"])

        return JsonResponse({"url": session.url})

    except stripe.StripeError:
        logger.exception("Video capsule Stripe checkout failed")
        return JsonResponse(
            {"error": "Unable to start payment. Please try again."},
            status=502,
        )


@csrf_exempt
@require_POST
def stripe_video_capsule_webhook(request):
    """Mark a video capsule paid only after Stripe verifies the event."""
    webhook_secret = os.environ.get("STRIPE_VIDEO_WEBHOOK_SECRET")

    if not webhook_secret:
        logger.error("Video capsule Stripe webhook secret is missing")
        return JsonResponse({"error": "Webhook is not configured."}, status=503)

    signature = request.headers.get("Stripe-Signature", "")

    try:
        event = stripe.Webhook.construct_event(
            request.body,
            signature,
            webhook_secret,
        )
    except (ValueError, stripe.SignatureVerificationError):
        return JsonResponse({"error": "Invalid webhook."}, status=400)

    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        metadata = session.get("metadata") or {}

        if (
            metadata.get("product") == "video-time-capsule"
            and session.get("payment_status") == "paid"
        ):
            capsule_id = metadata.get("capsule_id")

            try:
                capsule = TimeCapsule.objects.get(
                    id=capsule_id,
                    capsule_type="video",
                    stripe_session_id=session["id"],
                )

                if capsule.payment_status != "paid":
                    capsule.payment_status = "paid"
                    capsule.save(update_fields=["payment_status"])

            except (TimeCapsule.DoesNotExist, ValueError, TypeError):
                logger.exception(
                    "Could not match paid Stripe session to video capsule"
                )
                return JsonResponse(
                    {"error": "Capsule payment record not found."},
                    status=500,
                )

    return JsonResponse({"received": True})
@csrf_exempt
@require_GET
def verify_video_capsule_checkout_session(request):
    session_id = request.GET.get("session_id")

    if not session_id:
        return JsonResponse(
            {"success": False, "error": "Missing checkout session ID."},
            status=400,
        )

    stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")

    if not stripe.api_key:
        return JsonResponse(
            {"success": False, "error": "Payment service is not configured."},
            status=500,
        )

    try:
        session = stripe.checkout.Session.retrieve(session_id)

        if (
            session.payment_status != "paid"
            or session.metadata.get("product") != "video-time-capsule"
        ):
            return JsonResponse(
                {"success": False, "error": "Payment has not been confirmed."},
                status=400,
            )

        capsule_id = session.metadata.get("capsule_id")

        if not capsule_id:
            return JsonResponse(
                {"success": False, "error": "Capsule reference is missing."},
                status=400,
            )

        capsule = TimeCapsule.objects.get(
            id=capsule_id,
            capsule_type="video",
            stripe_session_id=session.id,
        )

        # Confirm the payment in the database as well.
        if capsule.payment_status != "paid":
            capsule.payment_status = "paid"
            capsule.save(update_fields=["payment_status"])

        return JsonResponse({
            "success": True,
            "capsule_id": capsule.id,
        })

    except TimeCapsule.DoesNotExist:
        return JsonResponse(
            {"success": False, "error": "Video capsule not found."},
            status=404,
        )
    except stripe.error.StripeError:
        return JsonResponse(
            {"success": False, "error": "Could not verify the Stripe payment."},
            status=502,
        )