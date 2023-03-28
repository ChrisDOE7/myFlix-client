import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap/Button";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
   const { movieId } = useParams();
   const movie = movies.find(m => m.id === movieId);

   // if (!movie) {
   //    return <div>Loading...</div>;
   // }

   return (
      <div>
         <div>
            <img src={movie.image} />
         </div>
         <div>
            <span>Title: </span>
            <span>{movie.title}</span>
         </div>
         <div>
            <span>Genre: </span>
            <span>{movie.genre}</span>
         </div>
         <div>
            <span>Year: </span>
            <span>{movie.year}</span>
         </div>
         <div>
            <span>Director: </span>
            <span>{movie.director}</span>
         </div>
         <div>
            <span>Description: </span>
            <br />
            <span>{movie.description}</span>
         </div>
         <Link to={`/`}>
            <Button className="back-button">Back</Button>
         </Link>
      </div>
   );
};
