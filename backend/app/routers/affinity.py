from fastapi import APIRouter, HTTPException
from ..schemas import AffinityRequest, AffinityMatrix
from ..models import DATASETS
from ..embeddings import get_embedding
from ..vector_db import upsert_vectors, query_vector

router = APIRouter(prefix="/affinity", tags=["affinity"])

@router.post("/generate", response_model=AffinityMatrix)
async def generate_affinity(req: AffinityRequest):
    if len(req.dataset_ids) != 2:
        raise HTTPException(400, "Exactly two datasets required")
    ds1 = DATASETS.get(req.dataset_ids[0])
    ds2 = DATASETS.get(req.dataset_ids[1])
    if not ds1 or not ds2:
        raise HTTPException(404, "Dataset not found")

    items = []
    attributes = []
    for ds_id, ds in [(req.dataset_ids[0], ds1), (req.dataset_ids[1], ds2)]:
        for row in ds["rows"]:
            vec = get_embedding(row["attribute"])
            items.append({"id": f"{ds_id}|{row['attribute']}", "values": vec})
            attributes.append(row["attribute"])

    upsert_vectors(items)

    matrix = []
    for item in items:
        matches = query_vector(item["values"], top_k=len(items))
        score_map = {m.id: m.score for m in matches}
        scores = [score_map.get(it["id"], 0.0) for it in items]
        matrix.append(scores)

    return {"matrix": matrix, "attributes": attributes}
