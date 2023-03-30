import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie }) => {
   return (
      <Card className="h-100">
         <Card.Img variant="top" src={movie.image} />
         <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
               {movie.genre}
            </Card.Subtitle>
            <Card.Text>{movie.description}</Card.Text>
            <Link to={`/movies/${movie.id}`}>
               <button variant="link" className="back-button">
                  Open
               </button>
            </Link>
         </Card.Body>
      </Card>
   );
};

MovieCard.propTypes = {
   movie: PropTypes.shape({
      title: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      director: PropTypes.string
   }).isRequired
};
