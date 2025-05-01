import React from 'react';
import { useNavigate } from 'react-router-dom';
import FileUploader from '../components/FileUploader';
import ParsingForm from '../components/ParsingForm';

export default function DataIngestion() {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Upload & Parse CSV</h1>
      <div className="grid grid-cols-2 gap-4">
        <FileUploader />
        <ParsingForm />
      </div>
      <button className="mt-4 btn btn-primary" onClick={() => navigate('/datasets')}>Save & Continue</button>
    </div>
  );
}
