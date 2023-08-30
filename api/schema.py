# build a schema using pydantic
from pydantic import BaseModel

class Habit(BaseModel):
    task: str
    description: str
    type: int
    target: int
    amount: int
    status: bool
    occurance: str

    class Config:
        orm_mode = True