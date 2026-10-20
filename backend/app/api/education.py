from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.education import Education

router = APIRouter()

@router.get("/education")
def get_education(db: Session = Depends(get_db)):
    return db.query(Education).order_by(Education.display_order).all()
