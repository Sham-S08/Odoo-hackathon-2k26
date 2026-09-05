from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

ROOT_DIR = Path(__file__).resolve().parent.parent.parent.parent
SERVICE_DIR = Path(__file__).resolve().parent.parent.parent


class Settings(BaseSettings):
    GEMINI_API_KEY: str = ""
    APP_ENV: str = "development"
    PORT: int = 8000
    GEMINI_MODEL: str = "gemini-2.5-flash"

    model_config = SettingsConfigDict(
        env_file=(
            ROOT_DIR / ".env",
            SERVICE_DIR / ".env",
            ".env",
            "../.env",
        ),
        env_file_encoding="utf-8",
        extra="ignore",
    )
