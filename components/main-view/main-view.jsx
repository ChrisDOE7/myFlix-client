import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
   const [movies, setMovies] = useState([
      {
         id: 1,
         title: "Titanic",
         genre: "Drama",
         year: "1997",
         image:
            "https://m.media-amazon.com/images/I/81XmODGX7LL._AC_UY436_QL65_.jpg",
         director: "James Cameron"
      },
      {
         id: 2,
         title: "Goodfellas",
         genre: "Crime",
         year: "1990",
         image:
            "https://m.media-amazon.com/images/I/91llG6OCC4L._AC_UY436_QL65_.jpg",
         director: "Martin Scorsese"
      },
      {
         id: 3,
         title: "Pulp Fiction",
         genre: "Crime",
         year: "1994",
         image:
            "https://m.media-amazon.com/images/I/71W5O2mWD7L._AC_UY436_QL65_.jpg",
         director: "Quentin Tarantino"
      },
      {
         id: 4,
         title: "The Godfather",
         genre: "Crime",
         year: "1972",
         image:
            "https://m.media-amazon.com/images/I/715LlcDMiTL._AC_UY436_QL65_.jpg",
         director: "Francis Ford Coppola"
      },
      {
         id: 5,
         title: "The Shawshank Redemption",
         genre: "Drama",
         year: "1994",
         image:
            "https://m.media-amazon.com/images/I/71vl5lGjv4L._AC_UY436_QL65_.jpg",
         director: "Frank Darabont"
      }
   ]);

   const [selectedMovie, setSelectedMovie] = useState(null);

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
         {movies.map(movie => (
            <MovieCard
               key={movie.id}
               movie={movie}
               onMovieClick={newSelectedMovie => {
                  setSelectedMovie(newSelectedMovie);
               }}
            />
         ))}
      </div>
   );
};
