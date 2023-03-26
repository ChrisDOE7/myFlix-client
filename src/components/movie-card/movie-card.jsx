import PropTypes from "prop-types";
import { Button, Card, Col } from "react-bootstrap";
import "./movie-card.scss";

export const MovieCard = ({ movie, onMovieClick }) => {
   return (
      <Card className="h-100">
         <Card.Img variant="top" src={movie.image} />
         <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
               {movie.genre}
            </Card.Subtitle>
            <Card.Text>{movie.description}</Card.Text>
            <Button
               variant="primary"
               className="openMovie-button"
               onClick={() => onMovieClick(movie)}
            >
               Open
            </Button>
         </Card.Body>
      </Card>
   );
};
