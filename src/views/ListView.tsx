import React, { useEffect, useMemo, useState } from 'react';
import { usePokemon } from '../context/PokemonContext';
import { getPokemonIdFromUrl } from '../types/pokemon';
import { SearchBar } from '../components/SearchBar';
import { PokemonCard } from '../components/PokemonCard';
import { SortControls, SortKey } from '../components/SortControls';

export const ListView: React.FC = () => {
  const { getPage } = usePokemon();
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [ascending, setAscending] = useState(true);
  const [items, setItems] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    getPage(0, 200).then((data) => {
      setItems(
        data.results.map((r) => ({ id: getPokemonIdFromUrl(r.url), name: r.name }))
      );
    });
  }, [getPage]);

  const filteredSorted = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    let result = items.filter((i) => i.name.includes(normalized));
    result = result.sort((a, b) => {
      const valA = sortKey === 'name' ? a.name : a.id;
      const valB = sortKey === 'name' ? b.name : b.id;
      if (valA < valB) return ascending ? -1 : 1;
      if (valA > valB) return ascending ? 1 : -1;
      return 0;
    });
    return result;
  }, [items, query, sortKey, ascending]);

  return (
    <div className="container">
      <h2>Pokémon List</h2>
      <SearchBar value={query} onChange={setQuery} placeholder="Search Pokémon" />
      <div style={{ marginTop: 12 }}>
        <SortControls sortKey={sortKey} setSortKey={setSortKey} ascending={ascending} setAscending={setAscending} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
        {filteredSorted.map((p) => (
          <PokemonCard key={p.id} id={p.id} name={p.name} />
        ))}
      </div>
    </div>
  );
};


