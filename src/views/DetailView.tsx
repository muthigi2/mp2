import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePokemon } from '../context/PokemonContext';
import { PokemonDetails, getPokemonImageUrl } from '../types/pokemon';

export const DetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPokemonByName } = usePokemon();
  const [details, setDetails] = useState<PokemonDetails | null>(null);
  const numericId = useMemo(() => Number(id), [id]);

  useEffect(() => {
    if (!id) return;
    getPokemonByName(id).then(setDetails);
  }, [id, getPokemonByName]);

  function goPrev() {
    if (numericId > 1) navigate(`/detail/${numericId - 1}`);
  }
  async function goNext() {
    const nextId = numericId + 1;
    try {
      // Validate existence before navigating to avoid 404 spinner
      await getPokemonByName(String(nextId));
      navigate(`/detail/${nextId}`);
    } catch {
      // If next id doesn't exist, wrap around to 1
      navigate('/detail/1');
    }
  }

  if (!details) return <div className="container">Loading...</div>;

  const img = getPokemonImageUrl(details.id);

  return (
    <div className="container">
      <h2 style={{ textTransform: 'capitalize' }}>{details.name} #{details.id}</h2>
      {img && <img src={img} alt={details.name} style={{ width: 300, height: 300, objectFit: 'contain' }} />}
      <div style={{ maxWidth: 420, margin: '12px auto 0', textAlign: 'left' }}>
        <div>
          <strong>Types:</strong> {details.types.map((t) => t.type.name).join(', ')}
        </div>
        <div style={{ marginTop: 8 }}>
          <strong>Stats:</strong>
          <ul>
            {details.stats.map((s) => (
              <li key={s.stat.name}>{s.stat.name}: {s.base_stat}</li>
            ))}
          </ul>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={goPrev} aria-label="previous">Previous</button>
        <button onClick={goNext} aria-label="next">Next</button>
      </div>
    </div>
  );
};


