from db.db import SessionLocal
from db.repos.story_repo import StoryRepository

def get_user_stories(user_id: int):
    with SessionLocal() as session:
        repo = StoryRepository(session)
        return repo.retrieve_user_stories(user_id)

def get_community_stories():
    with SessionLocal() as session:
        repo = StoryRepository(session)
        return repo.retrieve_public_stories()

