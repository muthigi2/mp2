import React from 'react';

export type SortKey = 'name' | 'id';

interface SortControlsProps {
  sortKey: SortKey;
  setSortKey: (key: SortKey) => void;
  ascending: boolean;
  setAscending: (asc: boolean) => void;
}

export const SortControls: React.FC<SortControlsProps> = ({ sortKey, setSortKey, ascending, setAscending }) => {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <label>
        Sort By:
        <select value={sortKey} onChange={(e) => setSortKey(e.target.value as SortKey)} style={{ marginLeft: 8 }}>
          <option value="name">Name</option>
          <option value="id">ID</option>
        </select>
      </label>
      <button onClick={() => setAscending(!ascending)} aria-label="toggle-order">
        {ascending ? 'Ascending' : 'Descending'}
      </button>
    </div>
  );
};


