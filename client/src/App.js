import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Switch } from "react-router-dom";
import Movie from './Movies/Movie';
import MovieList from './Movies/MovieList';


import SavedList from './Movies/SavedList';

const App = () => {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies')
        .then(response => {
          console.log(response.data);
          setMovieList(response.data);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  const addToSavedList = id => {
    setSaved( [...saved, movieList[id]] );
  };

  return (
    <div>
      {/* <SavedList list={[ ]} /> */}
      <Switch>
        <Route path="/movie/:id">
          <Movie />
        </Route>

        <Route
          exact
          path="/"
          render={() => 
            <MovieList movies={movieList}/>
        }/>
      </Switch>
      
    </div>
  );
};

export default App;
