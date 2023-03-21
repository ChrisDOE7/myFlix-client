export const MovieCard = ({ movie, onMovieClick }) => {
   return (
      <div
         onClick={() => {
            onMovieClick(movie);
         }}
      >
         {movie.title}
         {movie.genre}
      </div>
   );
};
