// src/api/datasets.js
import { API_BASE } from './settings';

export async function uploadDataset(formData) {
  const resp = await fetch(`${API_BASE}/datasets/upload`, {
    method: 'POST',
    body: formData,
  });
  if (!resp.ok) throw new Error('Upload failed');
  return resp.json();
}

export async function listDatasets() {
  const resp = await fetch(`${API_BASE}/datasets/`);
  if (!resp.ok) throw new Error('Fetch failed');
  return resp.json();
}
