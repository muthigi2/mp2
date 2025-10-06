import axios from 'axios';
import { PokemonListResponse, PokemonDetails, TypeListResponse } from '../types/pokemon';

const api = axios.create({ baseURL: 'https://pokeapi.co/api/v2' });

// Fetches a page of pokemons from the PokeAPI
export async function fetchPokemonPage(offset: number, limit: number): Promise<PokemonListResponse> {
  const { data } = await api.get<PokemonListResponse>(`/pokemon`, { params: { offset, limit } });
  return data;
}

// Interestingly this api accepts both name and id to get the pokemon details.
// Check this out => https://pokeapi.co/docs/v2#pokemon
export async function fetchPokemonByName(nameOrId: string): Promise<PokemonDetails> {
  const { data } = await api.get<PokemonDetails>(`/pokemon/${nameOrId}`);
  return data;
}

export async function fetchTypes(): Promise<TypeListResponse> {
  const { data } = await api.get<TypeListResponse>(`/type`);
  return data;
}

