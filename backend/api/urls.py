
from django.urls import path
from .views import (
    create_checkout_session,
    verify_checkout_session,
    create_time_capsule,
    upload_time_capsule_video,
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
]

