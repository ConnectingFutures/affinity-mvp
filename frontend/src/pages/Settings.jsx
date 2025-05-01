import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function Settings() {
  const { settings, setSettings } = useContext(AppContext);

  return (
    <div className="p-4 max-w-md">
      <h1 className="text-xl font-bold mb-4">Settings</h1>
      <label className="block mb-2">
        API Key:
        <input
          type="password"
          className="input input-bordered w-full"
          value={settings.apiKey}
          onChange={e => setSettings(s => ({ ...s, apiKey: e.target.value }))}
        />
      </label>
      <label className="block mb-2">
        Embedding Model:
        <select
          className="select select-bordered w-full"
          value={settings.model}
          onChange={e => setSettings(s => ({ ...s, model: e.target.value }))}        >
          <option value="text-embedding-ada-002">ada-002</option>
          <option value="text-embedding-babbage-001">babbage-001</option>
        </select>
      </label>
      <label className="block mb-4">
        Threshold:
        <input
          type="number"
          className="input input-bordered w-24"
          value={settings.threshold}
          onChange={e => setSettings(s => ({ ...s, threshold: +e.target.value }))}
        />
      </label>
      <button className="btn btn-primary">Save Settings</button>
    </div>
  );
}
