from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Float,Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

Base  = declarative_base()

class Habit(Base):
    __tablename__ = 'habit'
    id  = Column(Integer, primary_key=True, index=True)
    task = Column(String)
    description = Column(String)
    type = Column(Integer)
    target = Column(Integer)
    amount = Column(Integer)
    status = Column(Boolean)
    occurance = Column(String)


