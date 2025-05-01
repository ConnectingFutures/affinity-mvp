from fastapi import APIRouter, UploadFile, File, Form, HTTPException
import csv, io, uuid
from ..schemas import DatasetItem
from ..models import DATASETS

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
    text = content.decode('utf-8')
    reader = csv.reader(io.StringIO(text), delimiter=delimiter)
    rows = list(reader)
    if header_row < 1 or header_row > len(rows):
        raise HTTPException(status_code=400, detail="Invalid header row")
    preview = [{"attribute": r[attribute_col], "metric": r[metric_col]} for r in rows[header_row:header_row+5]]
    ds_id = str(uuid.uuid4())
    DATASETS[ds_id] = {"name": name, "rows": [{"attribute": r[attribute_col], "metric": r[metric_col]} for r in rows[header_row:]]}
    return {"id": ds_id, "name": name, "preview": preview}

@router.get("/", response_model=List[DatasetItem])
def list_datasets():
    return [{"id": ds_id, "name": ds["name"], "preview": ds["rows"][:5]} for ds_id, ds in DATASETS.items()]
