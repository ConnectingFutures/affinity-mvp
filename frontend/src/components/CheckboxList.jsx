import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function CheckboxList({ items, selected }) {
  const { setSelected } = useContext(AppContext);

  const toggle = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(x => x !== id));
    } else if (selected.length < 2) {
      setSelected([...selected, id]);
    }
  };

  return (
    <div className="space-y-2">
      {items.map(ds => (
        <label key={ds.id} className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={selected.includes(ds.id)}
            onChange={() => toggle(ds.id)}
          />
          <span>{ds.name}</span>
          <button
            className="ml-auto text-sm text-gray-500"
            onClick={() => alert(JSON.stringify(ds.preview, null, 2))}
          >
            Preview
          </button>
        </label>
      ))}
    </div>
  );
}
