
from django.db import models


class TimeCapsule(models.Model):
    CAPSULE_TYPES = [
        ("letter", "Letter Capsule"),
        ("video", "Video Capsule"),
    ]

    DELIVERY_OPTIONS = [
        ("30_days", "30 days"),
        ("1_year", "1 year"),
        ("3_years", "3 years"),
    ]

    PAYMENT_STATUSES = [
        ("free", "Free"),
        ("pending", "Payment pending"),
        ("paid", "Paid"),
    ]

    title = models.CharField(max_length=150)

    capsule_type = models.CharField(
        max_length=10,
        choices=CAPSULE_TYPES,
    )

    message = models.TextField(blank=True)

    recipient_email = models.EmailField()

    delivery_option = models.CharField(
        max_length=10,
        choices=DELIVERY_OPTIONS,
    )

    # Django will use this date to determine when a capsule
    # can be delivered. We will set it in the creation endpoint.
    delivery_at = models.DateTimeField(
        null=True,
        blank=True,
    )

    # Stores the Cloudflare R2 object key, not the video itself.
    video_storage_key = models.CharField(
        max_length=500,
        blank=True,
    )

    stripe_session_id = models.CharField(
        max_length=255,
        blank=True,
    )

    payment_status = models.CharField(
        max_length=10,
        choices=PAYMENT_STATUSES,
        default="free",
    )

    created_at = models.DateTimeField(auto_now_add=True)

    email_sent_at = models.DateTimeField(
        null=True,
        blank=True,
    )

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.title} ({self.capsule_type})"
