from db.db import AsyncSessionLocal
from db.repos.story_repo import StoryRepository 


async def get_user_stories(user_id: int):
    async with AsyncSessionLocal() as session:
        repo = StoryRepository(session)
        return await repo.retrieve_user_stories(user_id)


async def get_community_stories():
    async with AsyncSessionLocal() as session:
        repo = StoryRepository(session)
        return await repo.retrieve_public_stories()


async def delete_user_stories(story_id: int):
    async with AsyncSessionLocal() as session: 
        repo = StoryRepository(session)
        return await repo.delete_story_with_id(story_id)