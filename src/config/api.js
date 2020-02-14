import React, { useState, useEffect } from "react";

const Context = React.createContext();
const Provider = props => {
  const [movies, setMovies] = useState({});
  const [filterMoviesGenres, setFilterMoviesGenres] = useState({});
  const [selectedGenresState, setSelectedGenresState] = useState([]);
  const [genres, setGenres] = useState({});
  const [isDataLoading, setIsDataLoading] = useState(true);

  const getMoviesData = async () => {
    const fetchData = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=c8ea0f507445ac4406da8aec13887275&language=en-US&page=1"
    );
    const movies = await fetchData.json();
    setMovies(movies);
  };

  const getGenresData = async () => {
    const fetchData = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=c8ea0f507445ac4406da8aec13887275&language=en-US"
    );
    const genres = await fetchData.json();
    setGenres(genres);
  };

  const updatMoviesHandler = e => {
    const { value } = e.target;

    setSelectedGenresState(prevVal => [...prevVal, parseInt(value)]);

    if (selectedGenresState.includes(parseInt(value))) {
      setSelectedGenresState(
        selectedGenresState.filter(item => item !== parseInt(value))
      );
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsDataLoading(false);
    }, 3000);
    getMoviesData();
    getGenresData();
  }, []);

  useEffect(() => {
    const filterMovies = movies;
    const { results } = filterMovies;

    const filteredMovies =
    results &&
    results.filter(movie => {
      const {genre_ids} = movie;
      return genre_ids.find(item => {
        const compareItem = item;
        return selectedGenresState.includes(compareItem)
      })
    });

    setFilterMoviesGenres({ ...movies, results: filteredMovies });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGenresState, movies]);

  const combineReucer = {
    movies: movies,
    ...genres,
    updatMoviesHandler,
    filterMoviesGenres
  };

  return (
    <>
      <div className={`overlay ${isDataLoading ? "block" : "hidden"}`}>
        <img
          src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.png"
          alt=""
        />
      </div>
      <Context.Provider value={combineReucer}>
        {props.children}
      </Context.Provider>
    </>
  );
};

export { Provider, Context };
