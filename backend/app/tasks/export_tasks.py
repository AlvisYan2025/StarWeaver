"""
Celery tasks for exporting stories (PDF, etc.).
"""
from app.celery_app import celery_app


@celery_app.task(name="export_story_pdf")
def export_story_pdf_task(story_id: int):
    """
    Async task to export a story to PDF format.
    
    Args:
        story_id: ID of the story to export
        
    Returns:
        PDF file URL or path in S3
    """
    # TODO: Implement PDF export logic
    return {"status": "pending", "message": "PDF export not yet implemented", "story_id": story_id}

