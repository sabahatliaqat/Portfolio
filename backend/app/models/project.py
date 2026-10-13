from sqlalchemy import String, Text, Boolean, JSON
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base


class Project(Base):
    __tablename__ = "project"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String(100), unique=True, index=True)
    description: Mapped[str] = mapped_column(String(500))
    case_study: Mapped[str] = mapped_column(Text)
    tech_stack: Mapped[list[str]] = mapped_column(JSON, default=list)
    github_url: Mapped[str | None] = mapped_column(String(250), nullable=True)
    demo_video_url: Mapped[str | None] = mapped_column(String(250), nullable=True)
    live_url: Mapped[str | None] = mapped_column(String(250), nullable=True)

    is_featured: Mapped[bool] = mapped_column(Boolean, default=False)
    