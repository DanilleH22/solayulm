
import os

import boto3
from botocore.config import Config


def get_r2_bucket_name():
    bucket_name = os.getenv("R2_BUCKET_NAME")

    if not bucket_name:
        raise RuntimeError(
            "R2_BUCKET_NAME is missing from your environment."
        )

    return bucket_name


def get_r2_client():
    endpoint_url = os.getenv("R2_ENDPOINT")
    access_key_id = os.getenv("R2_ACCESS_KEY_ID")
    secret_access_key = os.getenv("R2_SECRET_ACCESS_KEY")

    missing = []

    if not endpoint_url:
        missing.append("R2_ENDPOINT")
    if not access_key_id:
        missing.append("R2_ACCESS_KEY_ID")
    if not secret_access_key:
        missing.append("R2_SECRET_ACCESS_KEY")

    if missing:
        raise RuntimeError(
            "Missing R2 environment settings: "
            + ", ".join(missing)
        )

    if not endpoint_url.startswith("https://"):
        raise RuntimeError(
            "R2_ENDPOINT must start with https://"
        )

    return boto3.client(
        "s3",
        endpoint_url=endpoint_url.rstrip("/"),
        aws_access_key_id=access_key_id,
        aws_secret_access_key=secret_access_key,
        region_name="auto",
        config=Config(signature_version="s3v4"),
    )
