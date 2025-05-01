from fastapi import APIRouter, UploadFile, File, Form, HTTPException
import csv, io, uuid
import numpy as np
import openai
from typing import List
from ..settings import settings
from ..models import DATASETS
from ..schemas import DatasetItem

openai.api_key = settings.openai_api_key
router = APIRouter(prefix="/datasets", tags=["datasets"])

@router.post("/upload", response_model=DatasetItem)
async def upload_dataset(
    file: UploadFile = File(...),
    delimiter: str = Form(","),
    header_row: int = Form(1),
    attribute_col: int = Form(0),
    metric_col: int = Form(1),
    name: str = Form(...)
):
    content = await file.read()
    rows = list(csv.reader(io.StringIO(content.decode('utf-8')), delimiter=delimiter))
    if header_row < 1 or header_row > len(rows):
        raise HTTPException(400, "Invalid header row")
    data_rows = rows[header_row:]
    attributes = [r[attribute_col] for r in data_rows]
    metrics = [r[metric_col] for r in data_rows]
    preview = [{"attribute": a, "metric": m} for a, m in zip(attributes[:5], metrics[:5])]
    embeddings = []
    for attr in attributes:
        resp = openai.Embedding.create(input=[attr], model="text-embedding-ada-002")
        embeddings.append(resp.data[0].embedding)
    embeddings = np.array(embeddings)
    ds_id = str(uuid.uuid4())
    DATASETS[ds_id] = {"name": name, "attributes": attributes, "metrics": metrics, "embeddings": embeddings}
    return {"id": ds_id, "name": name, "preview": preview}

@router.get("/", response_model=List[DatasetItem])
def list_datasets():
    return [{"id": ds_id, "name": ds["name"], "preview": [{"attribute": a, "metric": m} for a, m in zip(ds["attributes"][:5], ds["metrics"][:5])]} for ds_id, ds in DATASETS.items()]

