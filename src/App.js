/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import MovieCard from "./components/MovieCard";
import "./App.css";
import TopNav from "./components/TopNav";

function App() {
  return (
    <div className="App">
      <TopNav />
      <h1>Movies</h1>
      <MovieCard />
    </div>
  );
}

export default App;
