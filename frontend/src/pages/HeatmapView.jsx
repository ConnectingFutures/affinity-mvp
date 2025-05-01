import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import Heatmap from '../components/Heatmap';
import AgentPanel from '../components/AgentPanel';
import ExportControls from '../components/ExportControls';
import { computeAffinity } from '../api/affinity';

export default function HeatmapView() {
  const { selected, matrix, setMatrix, adjustments } = useContext(AppContext);

  useEffect(() => {
    if (selected.length === 2) {
      computeAffinity(selected).then(setMatrix).catch(() => alert('Affinity failed'));
    }
  }, [selected, setMatrix]);

  return (
    <div className="flex p-4">
      <div className="flex-1">
        <Heatmap data={matrix} adjustments={adjustments} />
        <div className="mt-4">
          <button className="btn btn-secondary">Recompute</button>
          <ExportControls matrix={matrix} />
        </div>
      </div>
      <AgentPanel />
    </div>
  );
}
