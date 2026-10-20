
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api import health, projects, skills, chat
from app.api import education as education_api
from app.api import experience as experience_api
from app.core.database import engine, Base
from app.models import *

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    health.router,
    prefix=settings.API_V1_STR,
    tags=["Health"]
)

app.include_router(
    projects.router,
    prefix=settings.API_V1_STR,
    tags=["Projects"]
)

app.include_router(
    skills.router,
    prefix=settings.API_V1_STR,
    tags=["Skills"]
)

app.include_router(
    chat.router,
    prefix=settings.API_V1_STR,
    tags=["AI Assistant"]
)

app.include_router(
    education_api.router,
    prefix=settings.API_V1_STR,
    tags=["Education"]
)

app.include_router(
    experience_api.router,
    prefix=settings.API_V1_STR,
    tags=["Experience"]
)

@app.get("/")
def root():
    return {
        "message": "Welcome to Sabahat Liaqat's Portfolio Backend!"
    }
