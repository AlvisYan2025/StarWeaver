from sqlalchemy.orm import Session
from schema.story import Story, TextContent, Comment

class StoryRepository:
    def __init__(self, session: Session):
        self.session = session

    def create_new_story(self, user_id: int, title: str, genre: str = None) -> Story:
        story = Story(user_id=user_id, title=title, genre=genre)
        self.session.add(story)
        self.session.commit()
        return story

    def retrieve_user_stories(self, user_id: int) -> list[Story]:
        return self.session.query(Story).filter_by(user_id=user_id).all()

    def retrieve_story_with_id(self, story_id: int) -> Story:
        return self.session.query(Story).filter_by(id=story_id).first()

    def delete_story_with_id(self, story_id: int) -> bool:
        story = self.retrieve_story_with_id(story_id)
        if story:
            self.session.delete(story)
            self.session.commit()
            return True
        return False

    def add_text_to_story(self, story_id: int, text: str, parent_id: int = None) -> TextContent:
        content = TextContent(story_id=story_id, text=text, parent_id=parent_id)
        self.session.add(content)
        self.session.commit()
        return content

    def retrieve_text_from_story(self, story_id: int) -> list[TextContent]:
        return self.session.query(TextContent).filter_by(story_id=story_id).all()

    def modify_text_in_story(self, text_id: int, new_text: str) -> bool:
        text_chunk = self.session.query(TextContent).filter_by(id=text_id).first()
        if text_chunk:
            text_chunk.text = new_text
            self.session.commit()
            return True
        return False

    def delete_text_from_story(self, text_id: int) -> bool:
        text_chunk = self.session.query(TextContent).filter_by(id=text_id).first()
        if text_chunk:
            self.session.delete(text_chunk)
            self.session.commit()
            return True
        return False

    def add_comment_to_story(self, story_id: int, user_id: int, text: str) -> Comment:
        comment = Comment(story_id=story_id, user_id=user_id, text=text)
        self.session.add(comment)
        self.session.commit()
        return comment

    def retrieve_comments_for_story(self, story_id: int) -> list[Comment]:
        return self.session.query(Comment).filter_by(story_id=story_id).all()

    def delete_comment_from_story(self, comment_id: int) -> bool:
        comment = self.session.query(Comment).filter_by(id=comment_id).first()
        if comment:
            self.session.delete(comment)
            self.session.commit()
            return True
        return False
