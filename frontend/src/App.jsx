import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import DataIngestion from './pages/DataIngestion';
import DatasetSelection from './pages/DatasetSelection';
import HeatmapView from './pages/HeatmapView';
import Settings from './pages/Settings';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<DataIngestion />} />
          <Route path="/datasets" element={<DatasetSelection />} />
          <Route path="/heatmap" element={<HeatmapView />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
