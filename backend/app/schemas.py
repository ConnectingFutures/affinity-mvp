from pydantic import BaseModel
from typing import List, Dict

class DatasetItem(BaseModel):
    id: str
    name: str
    preview: List[Dict[str, str]]

class AffinityRequest(BaseModel):
    dataset_ids: List[str]

class AffinityMatrix(BaseModel):
    matrix: List[List[float]]
    attributes1: List[str]
    attributes2: List[str]
