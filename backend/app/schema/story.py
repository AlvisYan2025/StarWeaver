from user import User   
from sqlalchemy import Column, Integer, String, DateTime, func
from sqlalchemy.ext.declarative import declarative_base
from db.db import Base

class Story(Base):
    __tablename__ = 'stories'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    title = Column(String(200), nullable=False)
    genre = Column(String(100), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    published = Column(Boolean, default=False)

    user = relationship('User', back_populates='stories')
    contents = relationship('TextContent', back_populates='story', cascade='all, delete-orphan')
    comments = relationship("Comment", back_populates="story", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Story(id={self.id}, title={self.title})>"

class TextContent(Base):
    __tablename__ = 'text_contents'
    id = Column(Integer, primary_key=True, autoincrement=True)
    story_id = Column(Integer, ForeignKey('stories.id'), nullable=False)
    parent_id = Column(Integer, ForeignKey('text_contents.id'), nullable=True)
    text = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True),server_default=func.now())
    
    story = relationship('Story', back_populates='contents')
    parent = relationship('TextContent', remote_side=[id], back_populates='children')
    children = relationship('TextContent', back_populates='parent', cascade='all, delete-orphan')
    # Image to be added later

    def __repr__(self):
        return f"<TextContent(id={self.id}, story_id={self.story_id}, text={self.text[:30]}...)>"

class Comment(Base):
    __tablename__ = 'comments'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    story_id = Column(Integer, ForeignKey('stories.id'), nullable=False)
    text = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="comments")
    story = relationship("Story", back_populates="comments")