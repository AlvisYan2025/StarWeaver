from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import sessionmaker 
import dotenv
from pathlib import Path
import os

Base = declarative_base()
dotenv.load_dotenv(dotenv_path=Path(".env"))
DATABASE_NEON_URL = os.getenv("DATABASE_NEON_URL")
engine = create_engine(DATABASE_NEON_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def init_db():
    Base.metadata.create_all(bind=engine)
