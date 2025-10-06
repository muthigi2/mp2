import React, { createContext, useContext, useMemo, useRef, useState } from 'react';
import { fetchPokemonByName, fetchPokemonPage, fetchTypes } from '../services/pokeapi';
import { NamedAPIResource, PokemonDetails, PokemonListResponse, TypeListResponse } from '../types/pokemon';

// Fallback list of Pokémon types.
// I am assuming these names to be effectively stable in PokeAPI, hence it's safe to hardcode
// as a last resort if the types endpoint is temporarily unavailable.
const FALLBACK_TYPES: NamedAPIResource[] = [
  'normal','fighting','flying','poison','ground','rock','bug','ghost','steel',
  'fire','water','grass','electric','psychic','ice','dragon','dark','fairy',
  'stellar','unknown'
].map((name) => ({ name, url: `#type-${name}` }));

interface PokemonContextValue {
  getPokemonByName: (name: string) => Promise<PokemonDetails>;
  getPage: (offset: number, limit: number) => Promise<PokemonListResponse>;
  getTypes: () => Promise<NamedAPIResource[]>;
}

// This context is returned by the PokemonProvider and is used to fetch the pokemon data from the PokeAPI and cache it.
const PokemonContext = createContext<PokemonContextValue | undefined>(undefined);

// This provider is used at the root of the application so that the context is available to all the children components.
// Check the App.tsx file for more details.
export const PokemonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pokemonCache = useRef<Map<string, PokemonDetails>>(new Map());
  const pageCache = useRef<Map<string, PokemonListResponse>>(new Map());
  const [types, setTypes] = useState<NamedAPIResource[] | null>(null);

  const value = useMemo<PokemonContextValue>(() => ({
    async getPokemonByName(name: string) {
      const key = name.toLowerCase();
      const cached = pokemonCache.current.get(key);
      if (cached) return cached;
      const data = await fetchPokemonByName(key);
      pokemonCache.current.set(key, data);
      return data;
    },
    async getPage(offset: number, limit: number) {

      // This is a little bit of an over-engineering from me honestly.
      // The idea here is that we get the first 200 pokemons for list view and the first 150 for gallery view starting from 0.
      // If we want to get the next page, we just add 200 to the offset.
      // However, for this project, I dont want to over complicate it and hence not adding the feature to get the next page starting from offset 200.
      // Here, we cache the page results of the api call and reuse it.
      // Technically speaking, offset is always 0 for now and the limit could be 200 or 150... and only this much gets cached.
      const key = `${offset}:${limit}`;
      const cached = pageCache.current.get(key);
      if (cached) return cached;
      const data = await fetchPokemonPage(offset, limit);
      pageCache.current.set(key, data);
      return data;
    },
    async getTypes() {
      if (types) return types;
      try {
        const data: TypeListResponse = await fetchTypes();
        setTypes(data.results);
        return data.results;
      } catch (_) {
        // See FALLBACK_TYPES comment above.
        setTypes(FALLBACK_TYPES);
        return FALLBACK_TYPES;
      }
    }
  }), [types]);

  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  );
};

export function usePokemon() {
  const ctx = useContext(PokemonContext);
  if (!ctx) throw new Error('usePokemon must be used within PokemonProvider');
  return ctx;
}


