from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class UserOut(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        from_attributes = True


class StoryCreate(BaseModel):
    title: str
    content: str
    genre: str

class StoryOut(StoryCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
