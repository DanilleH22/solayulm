
from django.conf import settings
from django.core.management.base import BaseCommand
from django.core.mail import send_mail
from django.utils import timezone

from api.models import TimeCapsule


class Command(BaseCommand):
    help = "Send emails for letter capsules that are due."

    def handle(self, *args, **options):
        now = timezone.now()

        due_capsules = TimeCapsule.objects.filter(
            capsule_type="letter",
            delivery_at__lte=now,
            email_sent_at__isnull=True,
        )

        sent_count = 0
        failed_count = 0
        console_count = 0

        for capsule in due_capsules:
            subject = f"Your Solayulm Time Capsule: {capsule.title}"

            message = (
                "Hello,\n\n"
                "A Time Capsule has been opened for you on Solayulm.\n\n"
                f"Title: {capsule.title}\n\n"
                f"{capsule.message}\n\n"
                "With care,\n"
                "Solayulm"
            )

            try:
                result = send_mail(
                    subject=subject,
                    message=message,
                    from_email=None,
                    recipient_list=[capsule.recipient_email],
                    fail_silently=False,
                )

                if result != 1:
                    failed_count += 1
                    self.stderr.write(
                        f"Email was not accepted for capsule "
                        f"#{capsule.id}."
                    )
                    continue

                if "console.EmailBackend" in settings.EMAIL_BACKEND:
                    console_count += 1
                    self.stdout.write(
                        "Console test only: capsule "
                        f"#{capsule.id} was printed, not emailed. "
                        "It has NOT been marked as sent."
                    )
                    continue

                capsule.email_sent_at = timezone.now()
                capsule.save(update_fields=["email_sent_at"])

                sent_count += 1
                self.stdout.write(
                    self.style.SUCCESS(
                        f"Processed capsule #{capsule.id}: "
                        f"{capsule.title}"
                    )
                )

            except Exception as exc:
                failed_count += 1
                self.stderr.write(
                    f"Failed capsule #{capsule.id}: {exc}"
                )

        if sent_count == 0 and failed_count == 0 and console_count == 0:
            self.stdout.write("No letter capsules are due.")

        self.stdout.write(
            f"Finished. Emailed: {sent_count}; "
            f"Console tests: {console_count}; "
            f"Failed: {failed_count}."
        )
