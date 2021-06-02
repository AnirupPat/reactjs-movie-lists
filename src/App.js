import React, { useState, useEffect, useCallback } from "react";
import AddMovie from './components/AddMovie';
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addMovieHandler = (movie) => {
    console.log(movie);
  }

  const fecthMoviesHandler = useCallback( async() => {
    try {
      setIsLoading(true);
      // https://swapi.dev/api/films/
      const response = await fetch("https://react-movie-set-default-rtdb.firebaseio.com/movies.json");
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
  }, []);

  useEffect(() => {
    fecthMoviesHandler();
  }, [fecthMoviesHandler])

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
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fecthMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
