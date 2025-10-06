import React, { useEffect, useState } from 'react';
import { usePokemon } from '../context/PokemonContext';
import { NamedAPIResource } from '../types/pokemon';

interface TypeFilterProps {
  selected: string[];
  onChange: (types: string[]) => void;
}

export const TypeFilter: React.FC<TypeFilterProps> = ({ selected, onChange }) => {
  const { getTypes } = usePokemon();
  const [types, setTypes] = useState<NamedAPIResource[]>([]);

  useEffect(() => {
    getTypes().then(setTypes);
  }, [getTypes]);

  function toggle(typeName: string) {
    if (selected.includes(typeName)) {
      onChange(selected.filter((t) => t !== typeName));
    } else {
      onChange([...selected, typeName]);
    }
  }

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {types.map((t) => (
        <label key={t.name} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <input
            type="checkbox"
            checked={selected.includes(t.name)}
            onChange={() => toggle(t.name)}
          />
          {t.name}
        </label>
      ))}
    </div>
  );
};


