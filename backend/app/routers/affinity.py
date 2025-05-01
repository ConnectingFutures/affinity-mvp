from fastapi import APIRouter, HTTPException
from sklearn.metrics.pairwise import cosine_similarity
from ..models import DATASETS
from ..schemas import AffinityRequest, AffinityMatrix

router = APIRouter(prefix="/affinity", tags=["affinity"])

@router.post("/generate", response_model=AffinityMatrix)
async def generate_affinity(req: AffinityRequest):
    if len(req.dataset_ids) != 2:
        raise HTTPException(400, "Exactly two datasets required")
    ds1 = DATASETS.get(req.dataset_ids[0])
    ds2 = DATASETS.get(req.dataset_ids[1])
    if not ds1 or not ds2:
        raise HTTPException(404, "Dataset not found")
    emb1, emb2 = ds1['embeddings'], ds2['embeddings']
    matrix = cosine_similarity(emb1, emb2).tolist()
    return {"matrix": matrix, "attributes1": ds1['attributes'], "attributes2": ds2['attributes']}
