import React, { useState, useEffect, useCallback } from "react";
import AddMovie from './components/AddMovie';
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addMovieHandler = async(movie) => {
    console.log(movie);
    const response = await fetch("https://react-movie-set-default-rtdb.firebaseio.com/movies.json",{
      method: 'POST',
      body: JSON.stringify(movie),
      header: {
        'Content-Type': 'application/json'
      }
    });
      if(!response.ok) {
        throw new Error('Something went wrong');
      }
      const data = await response.json();
      console.log(data);
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
      console.log(data)
      let loadedMovies = [];
      for(const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        });
      }
      setMovieList(loadedMovies);
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
