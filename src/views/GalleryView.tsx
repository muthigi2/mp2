import React, { useEffect, useMemo, useState } from 'react';
import { usePokemon } from '../context/PokemonContext';
import { getPokemonIdFromUrl } from '../types/pokemon';
import { PokemonCard } from '../components/PokemonCard';
import { TypeFilter } from '../components/TypeFilter';
import { fetchPokemonByName } from '../services/pokeapi';

export const GalleryView: React.FC = () => {
  const { getPage } = usePokemon();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [items, setItems] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPage(0, 150).then((data) => {
      setItems(
        data.results.map((r) => ({ id: getPokemonIdFromUrl(r.url), name: r.name }))
      );
    });
  }, [getPage]);

  const filtered = useMemo(() => items, [items]);

  const [typeFiltered, setTypeFiltered] = useState<number[]>([]);
  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (selectedTypes.length === 0) {
        setTypeFiltered(filtered.map((i) => i.id));
        return;
      }
      setLoading(true);
      const matched: number[] = [];
      for (const item of filtered) {
        const details = await fetchPokemonByName(item.name);
        const pokemonTypeNames = details.types.map((t) => t.type.name);
        if (selectedTypes.every((t) => pokemonTypeNames.includes(t))) {
          matched.push(item.id);
        }
        if (cancelled) return;
      }
      if (!cancelled) setTypeFiltered(matched);
      setLoading(false);
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [filtered, selectedTypes]);

  const showItems = filtered.filter((i) => typeFiltered.includes(i.id));

  return (
    <div className="container">
      <h2>Pokémon Gallery</h2>
      <TypeFilter selected={selectedTypes} onChange={setSelectedTypes} />
      {loading && <div style={{ marginTop: 8 }}>Filtering...</div>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 16, marginTop: 16 }}>
        {showItems.map((p) => (
          // for gallery view, I want to hide the name and id metadata to keep it consisent with the youtube video demo of imdb
          <PokemonCard key={p.id} id={p.id} name={p.name} showMeta={false} />
        ))}
      </div>
    </div>
  );
};


