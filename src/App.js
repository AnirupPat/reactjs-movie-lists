import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fectMoviesHandler = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://swapi.dev/api/films/");
      if(!response.ok) {
        throw new Error('Something went wrong');
      }
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
    } catch(error) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  let content = <p>Found no movies</p>
  if(movieList.length > 0) {
    content = <MoviesList movies={movieList} />
  }

  if(isLoading) {
    content = <p>Loading...</p>
  }
  if(error) {
    content = <p>{error}</p>
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fectMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
