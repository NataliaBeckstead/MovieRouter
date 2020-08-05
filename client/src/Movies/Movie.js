import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'

const Movie = (props) => {
  console.log("something");
  const [movie, setMovie] = useState();
  const params = useParams();
  const id = Number(params.id);
 
  useEffect(() => {
    
    
    //const id1 = Number(id);
    //console.log("id=", id)
    // change ^^^ that line and grab the id from the URL
    // You will NEED to add a dependency array to this effect hook

       axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(response => {
          setMovie(response.data);
        })
        .catch(error => {
          console.error(error);
        });

  }, [id]);
  
  // Uncomment this only when you have moved on to the stretch goals
  // const saveMovie = evt => {
  // }

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const { title, director, metascore, stars } = movie;
  return (
    <div className="save-wrapper">
      <div className="movie-card">
        <h2>{title}</h2>
        <div className="movie-director">
          Director: <em>{director}</em>
        </div>
        <div className="movie-metascore">
          Metascore: <strong>{metascore}</strong>
        </div>
        <h3>Actors</h3>

        {stars.map(star => (
          <div key={star} className="movie-star">
            {star}
          </div>
        ))}
      </div>
      <div className="save-button" onClick={props.addToSavedList}>Save</div>
    </div>
  );
}

export default Movie;