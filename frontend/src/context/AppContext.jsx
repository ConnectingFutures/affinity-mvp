import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [datasets, setDatasets] = useState([]);
  const [selected, setSelected] = useState([]);
  const [matrix, setMatrix] = useState(null);
  const [adjustments, setAdjustments] = useState({});
  const [settings, setSettings] = useState({ apiKey: '', model: 'text-embedding-ada-002', threshold: 50 });

  return (
    <AppContext.Provider value={{ datasets, setDatasets, selected, setSelected, matrix, setMatrix, adjustments, setAdjustments, settings, setSettings }}>
      {children}
    </AppContext.Provider>
  );
}
