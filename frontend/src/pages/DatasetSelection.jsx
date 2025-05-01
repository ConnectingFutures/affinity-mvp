import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import CheckboxList from '../components/CheckboxList';
import { useNavigate } from 'react-router-dom';
import { listDatasets } from '../api/datasets';

export default function DatasetSelection() {
  const { datasets, setDatasets, selected } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    listDatasets().then(setDatasets).catch(() => alert('Failed to load datasets'));
  }, [setDatasets]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Select Exactly Two Datasets</h1>
      <CheckboxList items={datasets} selected={selected} />
      <button
        className="mt-4 btn btn-primary"
        disabled={selected.length !== 2}
        onClick={() => navigate('/heatmap')}
      >
        Generate Affinity
      </button>
    </div>
  );
}
