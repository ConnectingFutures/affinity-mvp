import { API_BASE } from './settings';

export async function computeAffinity(datasetIds) {
  const resp = await fetch(`${API_BASE}/affinity/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ dataset_ids: datasetIds }),
  });
  if (!resp.ok) throw new Error('Affinity request failed');
  return resp.json();
}
