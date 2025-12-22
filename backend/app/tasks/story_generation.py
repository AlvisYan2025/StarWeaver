"""
Celery tasks for story text generation.
"""
from app.celery_app import celery_app
from app.generator.text_generator.openai_api import generate_next_chunk


@celery_app.task(name="generate_story_chunk")
def generate_story_chunk_task(previous_text: str, genre: str = "fantasy", style: str = "descriptive", max_tokens: int = 200):
    """
    Async task to generate the next chunk of story text.
    
    Args:
        previous_text: The story text generated so far
        genre: Story genre (e.g., 'sci-fi', 'romance')
        style: Writing style (e.g., 'descriptive', 'dialogue-heavy')
        max_tokens: Maximum tokens to generate
        
    Returns:
        Generated story text chunk
    """
    try:
        result = generate_next_chunk(previous_text, genre, style, max_tokens)
        return {"status": "success", "text": result}
    except Exception as e:
        return {"status": "error", "error": str(e)}

