import React from 'react';

// Minimal placeholder: replace with real heatmap later
export default function Heatmap({ data }) {
  if (!data) return <div>Loading heatmap…</div>;
  return (
    <pre className="p-4 bg-gray-100 rounded">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}
