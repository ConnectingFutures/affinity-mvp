import json
import subprocess
import openai
from .settings import settings

openai.api_key = settings.openai_api_key

def get_embedding(text: str):
    engine = settings.embedding_engine.lower()
    if engine == 'ollama':
        proc = subprocess.run(
            ['ollama', 'embed', settings.embedding_model, '--stdin', '--json'],
            input=text,
            text=True,
            capture_output=True,
            check=True
        )
        data = json.loads(proc.stdout)
        return data.get('embedding')
    else:
        resp = openai.Embedding.create(input=[text], model=settings.embedding_model)
        return resp.data[0].embedding
