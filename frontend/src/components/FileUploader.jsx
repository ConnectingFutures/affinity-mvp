import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { uploadDataset } from '../api/datasets';

export default function FileUploader() {
  const { setDatasets } = useContext(AppContext);

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('delimiter', ',');
    formData.append('header_row', 1);
    formData.append('attribute_col', 0);
    formData.append('metric_col', 1);
    formData.append('name', file.name);

    try {
      const resp = await uploadDataset(formData);
      setDatasets(prev => [...prev, resp]);
    } catch {
      alert('Upload failed.');
    }
  };

  return (
    <div
      className="relative border-dashed border-2 border-gray-300 p-6 text-center"
      onDrop={e => { e.preventDefault(); handleFileUpload(e.dataTransfer.files[0]); }}
      onDragOver={e => e.preventDefault()}
    >
      <p>Drag & drop CSV here, or click to select file</p>
      <input
        type="file"
        accept=".csv"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={e => handleFileUpload(e.target.files[0])}
      />
    </div>
  );
}
