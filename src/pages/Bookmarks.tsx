import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';
import { type Movie } from '../types/movie';

export default function Bookmarks() {
  const { items } = useSelector((state: RootState) => state.movies);
  const bookmarkedIds = useSelector((state: RootState) => state.bookmarks.bookmarkedIds);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieToEdit, setMovieToEdit] = useState<Movie | null>(null);

  const bookmarkedMovies = items.filter(movie => bookmarkedIds.includes(movie.id));

  const handleEdit = (movie: Movie) => {
    setMovieToEdit(movie);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Your Bookmarks</h1>
        <div className="bg-[var(--card)] px-4 py-2 border border-[var(--border)] rounded-full text-sm font-medium">
          {bookmarkedMovies.length} movies
        </div>
      </div>

      {bookmarkedMovies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bookmarkedMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} onEdit={handleEdit} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 opacity-60 bg-[var(--card)] border border-[var(--border)] rounded-2xl">
          <h2 className="text-2xl font-bold">No bookmarks yet</h2>
          <p className="mt-2 text-balance">Click the bookmark icon on any movie card to save it here for later.</p>
        </div>
      )}

      <MovieModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        movieToEdit={movieToEdit}
      />
    </div>
  );
}
