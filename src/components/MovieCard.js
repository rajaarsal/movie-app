import React, { useContext } from "react";
import { Context } from "../config/api";
import _orderBy from "lodash/orderBy";

const MovieCard = () => {
  const data = useContext(Context);
  const { genres, movies, filterMoviesGenres } = data;
  const { results: allMovies } = movies;
  const { results: filtersMovies } = filterMoviesGenres;
  const renderData =
    filtersMovies && filtersMovies.length ? filtersMovies : allMovies;
  const sortedResults = _orderBy(renderData, "popularity", ["desc", "asc"]);

  const displayGenres = ({ genre_ids }) => {
    const check = genres.filter(obj => {
      const { id } = obj;
      return genre_ids.includes(id);
    });

    return check.map((item, _) => (
      <div key={_} className="movieCard_genres--item">
        {item.name}
      </div>
    ));
  };

  return (
    <div className="movieCard container">
      {sortedResults &&
        sortedResults.map((movie, _) => (
          <div className="movieCard_item" key={_}>
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt={movie.title}
            />
            <div className="movieCard_desc">
              <p className="movieCard_title">Title: {movie.title}</p>
              <div className="movieCard_genres">
                {genres && sortedResults && displayGenres(movie)}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MovieCard;
