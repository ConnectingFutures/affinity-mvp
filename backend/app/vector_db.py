import pinecone
from .settings import settings

pinecone.init(api_key=settings.pinecone_api_key, environment=settings.pinecone_env)
index = pinecone.Index(settings.pinecone_index)

def upsert_vectors(vectors):
    index.upsert(vectors)

def query_vector(vector, top_k=100):
    res = index.query(vector, top_k=top_k, include_metadata=True)
    return res.matches
