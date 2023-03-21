import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
   const [movies, setMovies] = useState([]);
   const [selectedMovie, setSelectedMovie] = useState(null);
   const [user, setUser] = useState(null);
   const [password, setPassword] = useState(null);

   useEffect(() => {
      fetch("https://openlibrary.org/search.json?q=harry+potter")
         .then((response) => response.json())
         .then((data) => {
            console.log("movies from api:", data);
            const moviesApi = data.docs.map((doc) => {
               return {
                  id: doc.key,
                  title: doc.title,
                  image: `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`,
                  author: doc.author_name?.[0],
               };
            });
            setMovies(moviesApi);
         });
   }, []);

   if (!user) {
      return <LoginView />;
   }

   if (selectedMovie) {
      return (
         <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
         />
      );
   }

   if (movies.length === 0) {
      return <div>The list is empty!</div>;
   }

   return (
      <div>
         {movies.map((movie) => (
            <MovieCard
               key={movie.id}
               movie={movie}
               onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
               }}
            />
         ))}
      </div>
   );
   <button
      onClick={() => {
         setUser(null);
      }}
   >
      Logout
   </button>;
};
