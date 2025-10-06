import React from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import { PokemonProvider } from './context/PokemonContext';
import { ListView } from './views/ListView';
import { GalleryView } from './views/GalleryView';
import { DetailView } from './views/DetailView';

function App() {
  return (
    // The pokemon provider is used to fetch the pokemon data from the PokeAPI and cache it.
    <PokemonProvider>
      <div className="App">
        <nav style={{ padding: 16 }}>
          <Link to="/">List</Link> |{' '}
          <Link to="/gallery">Gallery</Link>
        </nav>
        <Routes>
          <Route path="/" element={<ListView />} />
          {/* This below route is not needed, but I just added it so that if anybody wanted to go to the list view via url, they get to the same page. */}
          <Route path="/list" element={<ListView />} />
          <Route path="/gallery" element={<GalleryView />} />
          <Route path="/detail/:id" element={<DetailView />} />
        </Routes>
      </div>
    </PokemonProvider>
  );
}

export default App;
