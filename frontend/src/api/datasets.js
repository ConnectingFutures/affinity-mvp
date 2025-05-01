export async function uploadDataset(formData) {
  const resp = await fetch('/api/datasets/upload', {
    method: 'POST',
    body: formData,
  });
  if (!resp.ok) throw new Error('Upload failed');
  return resp.json();
}

export async function listDatasets() {
  const resp = await fetch('/api/datasets/');
  if (!resp.ok) throw new Error('Failed to fetch datasets');
  return resp.json();
}
