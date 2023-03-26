import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
   return (
      <Card className="h-100" style={{ width: "18rem" }}>
         <Card.Img variant="top" src={movie.image} />
         <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
               {movie.genre}
            </Card.Subtitle>
            <Card.Text>{movie.description}</Card.Text>
            <Button onClick={() => onMovieClick(movie)} variant="primary">
               Open
            </Button>
         </Card.Body>
      </Card>
   );
};
