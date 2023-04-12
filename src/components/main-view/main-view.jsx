import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { ProfileView } from "../profile-view/profile-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bars/navigation-bar";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./main-view.scss";

export const MainView = () => {
   const storedUser = JSON.parse(localStorage.getItem("user"));
   const storedToken = localStorage.getItem("token");
   const [user, setUser] = useState(storedUser ? storedUser : null);
   const [token, setToken] = useState(storedToken ? storedToken : null);
   const [movies, setMovies] = useState([]);

   const updateUser = user => {
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
   };

   useEffect(() => {
      if (!token) return;

      fetch("https://myflixapp2211.herokuapp.com/movies", {
         headers: { Authorization: `Bearer ${token}` }
      })
         .then(response => response.json())
         .then(movies => {
            const moviesFromApi = movies.map(movie => {
               return {
                  // value names match to API database
                  id: movie._id,
                  title: movie.Title,
                  image: movie.ImagePath[0],
                  description: movie.Description,
                  genre: movie.Genre.Name,
                  director: movie.Director.Name,
                  year: movie.Year
               };
            });
            setMovies(moviesFromApi);
         });
   }, [token]);

   return (
      <BrowserRouter>
         <NavigationBar
            user={user}
            onLoggedOut={() => {
               setUser(null);
            }}
         />
         <Row className="justify-content-md-center">
            <Routes>
               <Route
                  path="/signup"
                  element={
                     <>
                        {user ? (
                           <Navigate to="/" />
                        ) : (
                           <Col md={5} xs lg="4">
                              <SignupView />
                           </Col>
                        )}
                     </>
                  }
               />
               <Route
                  path="/login"
                  element={
                     <>
                        {user ? (
                           <Navigate to="/" />
                        ) : (
                           <Row className="justify-content-md-center">
                              <Col md={5} xs lg="4">
                                 <LoginView
                                    onLoggedIn={(user, token) => {
                                       setUser(user);
                                       setToken(token);
                                    }}
                                 />
                              </Col>
                           </Row>
                        )}
                     </>
                  }
               />
               <Route
                  path="/profile"
                  element={
                     !user ? (
                        <Navigate to="/login" replace />
                     ) : (
                        <ProfileView
                           user={user}
                           token={token}
                           movies={movies}
                           onLoggedOut={() => {
                              setUser(null);
                              setToken(null);
                              localStorage.clear();
                           }}
                           updateUser={updateUser}
                        />
                     )
                  }
               />
               <Route
                  path="/movies/:movieId"
                  element={
                     <>
                        {!user ? (
                           <Navigate to="/login" replace />
                        ) : movies.length === 0 ? (
                           <Col>The list is loading...</Col>
                        ) : (
                           <Col md={4}>
                              <MovieView movies={movies} />
                           </Col>
                        )}
                     </>
                  }
               />
               <Route
                  path="/"
                  element={
                     <>
                        {!user ? (
                           <Navigate to="/login" replace />
                        ) : movies.length === 0 ? (
                           <Col>The list is empty!</Col>
                        ) : (
                           <>
                              {movies.map(movie => (
                                 <Col className="mb-5" key={movie.id} md={3}>
                                    <MovieCard movie={movie} />
                                 </Col>
                              ))}
                           </>
                        )}
                     </>
                  }
               />
            </Routes>
         </Row>
      </BrowserRouter>
   );
};

// <>
//    <Button
//       variant="secondary"
//       onClick={() => {
//          setUser(null);
//          setToken(null);
//          localStorage.clear();
//       }}
//    >
//       Logout
//    </Button>
//    <Col md={4}>
//       <MovieView
//          movie={selectedMovie}
//          onBackClick={() => setSelectedMovie(null)}
//       />
//    </Col>
// </>
// ) : movies.length === 0 ? (<div>The list is empty!</div>) : (
// <>
//    <Button
//       variant="secondary"
//       onClick={() => {
//          setUser(null);
//          setToken(null);
//          localStorage.clear();
//       }}
//    >
//       Logout
//    </Button>
//    {movies.map(movie => (
//       <Col className="mb-5" key={movie.id} md={3}>
//          <MovieCard
//             movie={movie}
//             onMovieClick={newSelectedMovie => {
//                setSelectedMovie(newSelectedMovie);
//             }}
//          />
//       </Col>
//    ))}
// </>
// )}
