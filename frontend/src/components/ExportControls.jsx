import React from 'react';

export default function ExportControls() {
  return (
    <div className="mt-2">
      <button className="btn btn-outline mr-2" onClick={() => alert('CSV export not implemented')}>
        Export CSV
      </button>
      <button className="btn btn-outline" onClick={() => alert('PNG export not implemented')}>
        Export Image
      </button>
    </div>
  );
}
