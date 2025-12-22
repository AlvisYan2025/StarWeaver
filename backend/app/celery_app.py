"""
Celery configuration for async job processing.
Handles long-running tasks like LLM generation, image generation, and exports.
"""
from celery import Celery
import os
from pathlib import Path
import dotenv

# Load environment variables
dotenv.load_dotenv(dotenv_path=Path(".env"))

# Redis URL from environment (default to localhost for development)
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")

# Create Celery app
celery_app = Celery(
    "starweaver",
    broker=REDIS_URL,
    backend=REDIS_URL,
    include=[
        "app.tasks.story_generation",
        "app.tasks.image_generation",
        "app.tasks.export_tasks",
    ]
)

# Celery configuration
celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    task_track_started=True,
    task_time_limit=30 * 60,  # 30 minutes
    task_soft_time_limit=25 * 60,  # 25 minutes
    worker_prefetch_multiplier=1,
    worker_max_tasks_per_child=50,
)

