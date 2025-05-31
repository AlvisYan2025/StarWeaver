from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import sessionmaker
from shema.user import User
from schema.story import Story, TextContent, Comment
import dotenv
import os

Base = declarative_base()
dotenv.load_dotenv(dotenv_path=Path("backend/.env"))
DATABASE_NEON_URL = os.getenv("DATABASE_NEON_URL")
engine = create_engine(DATABASE_NEON_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def init_db():
    Base.metadata.create_all(bind=engine)

