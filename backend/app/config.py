import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    BET105_KEY: str = os.getenv("BET105_KEY")
    WALLET_PRIVATE_KEY: str = os.getenv("WALLET_PRIVATE_KEY")
    FIREBASE_JSON: str = os.getenv("FIREBASE_JSON")
    OPENAI_KEY: str = os.getenv("OPENAI_KEY")
    ANTHROPIC_KEY: str = os.getenv("ANTHROPIC_KEY")
    GEMINI_KEY: str = os.getenv("GEMINI_KEY")
    LLAMA_ENDPOINT: str = os.getenv("LLAMA_ENDPOINT")
    DEEPSEEK_KEY: str = os.getenv("DEEPSEEK_KEY")
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")

settings = Settings()
