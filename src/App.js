import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading]= useState(false);

  const fectMoviesHandler = async () => {
    setIsLoading(true);
    const response = await fetch("https://swapi.dev/api/films/");
    const data = await response.json();
    const transformedMovies = data.results.map((movie) => {
      return {
        id: movie.epidode_id,
        title: movie.title,
        openingText: movie.opening_crawl,
        releaseDate: movie.release_date,
      };
    });
    setMovieList(transformedMovies);
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fectMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movieList.length > 0 && <MoviesList movies={movieList} />}
        {!isLoading && movieList.length === 0 && <p>Found no movies</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
