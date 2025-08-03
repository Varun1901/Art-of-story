from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

# Load from .env
load_dotenv()

# Use SQLite for development (simpler setup)
SQLALCHEMY_DATABASE_URL = "sqlite:///./story_forge.db"

# For production, you can use MySQL by uncommenting the lines below:
# DB_TYPE = "mysql"
# DB_USER = os.getenv("DB_USER")
# DB_PASSWORD = os.getenv("DB_PASSWORD")
# DB_HOST = os.getenv("DB_HOST")
# DB_PORT = os.getenv("DB_PORT")
# DB_NAME = os.getenv("DB_NAME")
# SQLALCHEMY_DATABASE_URL = f"{DB_TYPE}+mysqlconnector://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
