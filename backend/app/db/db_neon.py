from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import sessionmaker
import dotenv
import os

dotenv.load_dotenv(dotenv_path=Path("backend/.env"))
engine = create_engine(DATABASE_NEON_URL)

def add_user(username, password):
    pass