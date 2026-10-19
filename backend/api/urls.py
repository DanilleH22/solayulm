
from django.urls import path
from .views import (
    create_checkout_session,
    verify_checkout_session,
    create_time_capsule,
    upload_time_capsule_video,
    create_video_capsule_checkout_session,
stripe_video_capsule_webhook,
)

urlpatterns = [
    path(
        "create-checkout-session/",
        create_checkout_session,
        name="create_checkout_session",
    ),
    path(
        "verify-checkout-session/",
        verify_checkout_session,
        name="verify_checkout_session",
    ),
    path(
        "create-time-capsule/",
        create_time_capsule,
        name="create_time_capsule",
    ),
    path(
    "upload-time-capsule-video/",
    upload_time_capsule_video,
    name="upload_time_capsule_video",
),
path(
    "create-video-capsule-checkout-session/",
    create_video_capsule_checkout_session,
    name="create_video_capsule_checkout_session",
),
path(
    "stripe-video-capsule-webhook/",
    stripe_video_capsule_webhook,
    name="stripe_video_capsule_webhook",
),
]

