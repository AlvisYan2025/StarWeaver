from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from schema.story import Story, TextContent, Comment

class StoryRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create_new_story(self, user_id: int, title: str, genre: str = None) -> Story:
        story = Story(user_id=user_id, title=title, genre=genre)
        self.session.add(story)
        await self.session.commit()
        await self.session.refresh(story)
        return story

    async def retrieve_user_stories(self, user_id: int) -> list[Story]:
        result = await self.session.execute(
            select(Story).where(Story.user_id == user_id)
        )
        return list(result.scalars().all())

    async def retrieve_story_with_id(self, story_id: int) -> Story:
        result = await self.session.execute(
            select(Story).where(Story.id == story_id)
        )
        return result.scalar_one_or_none()

    async def retrieve_public_stories(self) -> list[Story]:
        """Retrieve all published stories for community view."""
        result = await self.session.execute(
            select(Story).where(Story.published == True)
        )
        return list(result.scalars().all())

    async def delete_story_with_id(self, story_id: int) -> bool:
        story = await self.retrieve_story_with_id(story_id)
        if story:
            await self.session.delete(story)
            await self.session.commit()
            return True
        return False

    async def add_text_to_story(self, story_id: int, text: str, parent_id: int = None) -> TextContent:
        content = TextContent(story_id=story_id, text=text, parent_id=parent_id)
        self.session.add(content)
        await self.session.commit()
        await self.session.refresh(content)
        return content

    async def retrieve_text_from_story(self, story_id: int) -> list[TextContent]:
        result = await self.session.execute(
            select(TextContent).where(TextContent.story_id == story_id)
        )
        return list(result.scalars().all())

    async def modify_text_in_story(self, text_id: int, new_text: str) -> bool:
        result = await self.session.execute(
            select(TextContent).where(TextContent.id == text_id)
        )
        text_chunk = result.scalar_one_or_none()
        if text_chunk:
            text_chunk.text = new_text
            await self.session.commit()
            return True
        return False

    async def delete_text_from_story(self, text_id: int) -> bool:
        result = await self.session.execute(
            select(TextContent).where(TextContent.id == text_id)
        )
        text_chunk = result.scalar_one_or_none()
        if text_chunk:
            await self.session.delete(text_chunk)
            await self.session.commit()
            return True
        return False

    async def add_comment_to_story(self, story_id: int, user_id: int, text: str) -> Comment:
        comment = Comment(story_id=story_id, user_id=user_id, text=text)
        self.session.add(comment)
        await self.session.commit()
        await self.session.refresh(comment)
        return comment

    async def retrieve_comments_for_story(self, story_id: int) -> list[Comment]:
        result = await self.session.execute(
            select(Comment).where(Comment.story_id == story_id)
        )
        return list(result.scalars().all())

    async def delete_comment_from_story(self, comment_id: int) -> bool:
        result = await self.session.execute(
            select(Comment).where(Comment.id == comment_id)
        )
        comment = result.scalar_one_or_none()
        if comment:
            await self.session.delete(comment)
            await self.session.commit()
            return True
        return False
