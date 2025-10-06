export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
}

export interface PokemonTypeRef {
  slot: number;
  type: NamedAPIResource;
}

export interface PokemonSprites {
  other?: {
    ['getPokemonImageUrl']?: {
      front_default?: string;
    };
  };
  front_default?: string | null;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}

export interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: NamedAPIResource;
}

export interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonTypeRef[];
  sprites: PokemonSprites;
  stats: PokemonStat[];
  abilities: PokemonAbility[];
}

export interface TypeListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
}

export function getPokemonIdFromUrl(url: string): number {
  // url like https://pokeapi.co/api/v2/pokemon/1/
  const parts = url.split('/').filter(Boolean);
  const maybeId = parts[parts.length - 1];
  return Number(maybeId);
}

export function getPokemonImageUrl(pokemonId: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
}

