import os
import json
import uvicorn

from fastapi import FastAPI, Request
from fastapi_sqlalchemy import DBSessionMiddleware, db
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel

from schema import Habit as SchemaHabit

from schema import Habit

from models import Habit as ModelHabit
from dotenv import load_dotenv

load_dotenv('.env')


app = FastAPI()

app.add_middleware(DBSessionMiddleware, db_url=os.environ['DATABASE_URL'])

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

class Data(BaseModel):
    habit: str

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/data")
def mo_habit_data():
    """
        Get user habit data
    """

    habits = db.session.query(ModelHabit).all()

    return habits

@app.post("/data")
async def mo_habit_data_add(data: Request):
    habit = await data.json()

    db_habit = ModelHabit(task=habit["name"], description=habit["description"], 
        type=habit["FrequencyType"], amount=habit["amount"], 
        occurance=habit["occurance"], target=1, status=False)
    db.session.add(db_habit)
    db.session.commit()
    return { "data": db_habit }

@app.put("/data")
async def mo_habit_data_update(data: Request):
    habit = await data.json()
    db_habit = db.session.get(ModelHabit, habit["id"])
    db_habit.task = habit["name"]
    db_habit.description = habit["description"]
    db_habit.type = habit["FrequencyType"]
    db_habit.occurance = habit["occurance"]
    db_habit.status = habit["status"]

    db.session.commit()
    return { "success": True }

@app.delete("/data/{habit_id}")
async def mo_habit_data_delete(habit_id: str):
    print(habit_id)
    habit = db.session.get(ModelHabit, habit_id)
    db.session.delete(habit)
    db.session.commit()
    return { "success": True }

# To run locally
if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)