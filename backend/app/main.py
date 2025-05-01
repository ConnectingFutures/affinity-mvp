from fastapi import FastAPI
from .routers import datasets, affinity

app = FastAPI()
app.include_router(datasets.router)
app.include_router(affinity.router)

@app.get("/health")
def health():
    return {"status": "ok"}
