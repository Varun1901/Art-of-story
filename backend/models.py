from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True)
    email = Column(String(100), unique=True, index=True)
    hashed_password = Column(String(255))

    stories = relationship("Story", back_populates="owner")


class Story(Base):
    __tablename__ = "stories"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100))
    content = Column(Text)
    genre = Column(String(50))
    created_at = Column(DateTime, default=datetime.utcnow)

    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="stories")
