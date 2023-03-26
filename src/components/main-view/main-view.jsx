import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../Signup-view/signup-view";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import "./main-view.scss";

export const MainView = () => {
   const storedUser = JSON.parse(localStorage.getItem("user"));
   const storedToken = localStorage.getItem("token");
   const [user, setUser] = useState(storedUser ? storedUser : null);
   const [token, setToken] = useState(storedToken ? storedToken : null);
   const [movies, setMovies] = useState([]);
   const [selectedMovie, setSelectedMovie] = useState(null);

   useEffect(() => {
      if (!token) return;

      fetch("https://myflixapp2211.herokuapp.com/movies", {
         headers: { Authorization: `Bearer ${token}` },
      })
         .then((response) => response.json())
         .then((movies) => {
            console.log("data", movies);

            const moviesFromApi = movies.map((movie) => {
               return {
                  // value names match to API database
                  id: movie._id,
                  title: movie.Title,
                  image: movie.ImagePath,
                  description: movie.Description,
                  genre: movie.Genre.Name,
                  director: movie.Director.Name,
                  year: movie.Year,
               };
            });
            setMovies(moviesFromApi);
         });
   }, [token]);

   return (
      <Row className="justify-content-md-center">
         {!user ? (
            <Container className="mainContainer">
               <Row className="justify-content-md-center">
                  <Col md={5} xs lg="4">
                     <LoginView
                        onLoggedIn={(user, token) => {
                           setUser(user);
                           setToken(token);
                        }}
                     />
                  </Col>
                  <Col md={5} xs lg="4">
                     <SignupView />
                  </Col>
               </Row>
            </Container>
         ) : selectedMovie ? (
            <>
               <Button
                  variant="secondary"
                  onClick={() => {
                     setUser(null);
                     setToken(null);
                     localStorage.clear();
                  }}
               >
                  Logout
               </Button>
               <Col md={4}>
                  <MovieView
                     movie={selectedMovie}
                     onBackClick={() => setSelectedMovie(null)}
                  />
               </Col>
            </>
         ) : movies.length === 0 ? (
            <div>The list is empty!</div>
         ) : (
            <>
               <Button
                  variant="secondary"
                  onClick={() => {
                     setUser(null);
                     setToken(null);
                     localStorage.clear();
                  }}
               >
                  Logout
               </Button>
               {movies.map((movie) => (
                  <Col className="mb-5" key={movie.id} md={3}>
                     <MovieCard
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                           setSelectedMovie(newSelectedMovie);
                        }}
                     />
                  </Col>
               ))}
            </>
         )}
      </Row>
   );
};
