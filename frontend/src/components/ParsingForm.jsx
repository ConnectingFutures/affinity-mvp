import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { uploadDataset } from '../api/datasets';

export default function ParsingForm() {
  const { setDatasets } = useContext(AppContext);
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [delimiter, setDelimiter] = useState(',');
  const [headerRow, setHeaderRow] = useState(1);
  const [attributeCol, setAttributeCol] = useState(0);
  const [metricCol, setMetricCol] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Select a CSV first.');
    const fd = new FormData();
    fd.append('file', file);
    fd.append('name', name || file.name);
    fd.append('delimiter', delimiter);
    fd.append('header_row', headerRow);
    fd.append('attribute_col', attributeCol);
    fd.append('metric_col', metricCol);

    try {
      const resp = await uploadDataset(fd);
      setDatasets(prev => [...prev, resp]);
      setFile(null);
      setName('');
    } catch {
      alert('Parsing failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="file"
        accept=".csv"
        onChange={e => setFile(e.target.files[0])}
        className="block w-full"
      />
      <input
        type="text"
        placeholder="Dataset Name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="input input-bordered w-full"
      />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Delimiter</label>
          <input
            type="text"
            value={delimiter}
            onChange={e => setDelimiter(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label>Header Row</label>
          <input
            type="number"
            min={1}
            value={headerRow}
            onChange={e => setHeaderRow(+e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label>Attribute Column Index</label>
          <input
            type="number"
            value={attributeCol}
            onChange={e => setAttributeCol(+e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label>Metric Column Index</label>
          <input
            type="number"
            value={metricCol}
            onChange={e => setMetricCol(+e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary w-full">Upload & Parse</button>
    </form>
}
