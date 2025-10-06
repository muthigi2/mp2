import React from 'react';
import { getPokemonImageUrl } from '../types/pokemon';
import { Link } from 'react-router-dom';

interface PokemonCardProps {
  id: number;
  name: string;
  showMeta?: boolean; // Showing only the image (for gallery)
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, showMeta = true }) => {
  const img = getPokemonImageUrl(id);
  return (
    <Link to={`/detail/${id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <div
        style={{
          border: showMeta ? '1px solid rgba(0, 0, 0, 0.53)' : '1px solid rgba(0, 0, 0, 0.4)',
          borderRadius: showMeta ? 8 : 0,
          padding: showMeta ? 12 : 8,
          width: '100%',
          maxWidth: showMeta ? 600 : '100%',
          margin: showMeta ? '0 auto' : undefined,
          display: 'flex',
          alignItems: 'center',
          justifyContent: showMeta ? 'flex-start' : 'center',
          gap: showMeta ? 16 : 0
        }}
      >
        <img
          src={img}
          alt={name}
          style={{ width: showMeta ? 96 : 120, height: showMeta ? 96 : 120, objectFit: 'contain' }}
        />
        {showMeta && (
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontWeight: 700 }}>
              Pokémon name: <span style={{ textTransform: 'capitalize' }}>{name}</span>
            </div>
            <div style={{ color: 'rgba(0, 0, 0, 0.6)', marginTop: 4 }}>Pokémon id: #{id}</div>
          </div>
        )}
      </div>
    </Link>
  );
};


