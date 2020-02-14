import React, { useContext } from "react";
import { Context } from "../config/api";

const TopNav = () => {
  let data = useContext(Context);
  const { genres, updatMoviesHandler } = data;
  // console.log(updatMoviesHandler);

  return (
    <div className="topNav">
      <div className="container">
        <button>
          Genres
          <ul className="genres">
            {genres &&
              genres.map((genre, _) => (
                <li key={_}>
                  <label>
                    <input
                      type="checkbox"
                      value={genre.id}
                      onChange={updatMoviesHandler}
                    />
                    {genre.name}
                  </label>
                </li>
              ))}
          </ul>
        </button>
      </div>
    </div>
  );
};

export default TopNav;
