import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
   const { movieId } = useParams();

   const movie = movies.find(m => m.id === movieId);

   if (!movie) {
      return <div>Movie not found!</div>;
   }

   return (
      <div className="movieViewDetails">
         <div>
            <Image className="w-100" src={movie.image} />
         </div>
         <div>
            <span className="title">{movie.title}</span>
         </div>
         <div className="genreYear-container">
            <span className="genre">{movie.genre}</span>
            <span className="year">{movie.year}</span>
         </div>
         <div className="description">
            <span>{movie.description}</span>
         </div>
         <div className="director">
            <span>Director: </span>
            <span>{movie.director}</span>
         </div>
         <br></br>
         <Link to={`/`}>
            <button className="back-button" variant="link">
               Back
            </button>
         </Link>
      </div>
   );
};

// MovieView.propTypes = {
//    movie: PropTypes.shape({
//       title: PropTypes.string.isRequired,
//       genre: PropTypes.string.isRequired,
//       image: PropTypes.string.isRequired,
//       director: PropTypes.string,
//       description: PropTypes.string
//    }).isRequired
// };
