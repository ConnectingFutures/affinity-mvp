from pydantic import BaseSettings

class Settings(BaseSettings):
    openai_api_key: str
    pinecone_api_key: str
    pinecone_env: str
    pinecone_index: str
    embedding_engine: str
    embedding_model: str

    class Config:
        env_file = ".env"

settings = Settings()
