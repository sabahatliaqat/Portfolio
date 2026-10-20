from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.experience import Experience

router = APIRouter()

@router.get("/experience")
def get_experience(db: Session = Depends(get_db)):
    return db.query(Experience).order_by(Experience.display_order).all()
