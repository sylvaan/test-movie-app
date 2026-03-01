import { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Search, Plus, Loader2, AlertCircle } from 'lucide-react';
import type { RootState, AppDispatch } from '../app/store';
import { setSearchQuery, setSortBy, setPage, setFilterBy, fetchMovies } from '../features/movies/moviesSlice';
import { fetchGenres } from '../features/genres/genresSlice';
import { type Movie } from '../types/movie';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, searchQuery, sortBy, filterBy, currentPage, status, error } = useSelector((state: RootState) => state.movies);
  const { items: genres, status: genreStatus } = useSelector((state: RootState) => state.genres);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchMovies());
    if (genreStatus === 'idle') dispatch(fetchGenres());
  }, [status, genreStatus, dispatch]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieToEdit, setMovieToEdit] = useState<Movie | null>(null);

  const handleEdit = (movie: Movie) => {
    setMovieToEdit(movie);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setMovieToEdit(null);
    setIsModalOpen(true);
  };

  // Filter and Sort Logic
  const processedMovies = useMemo(() => {
    let filtered = [...items];

    // Filter by genre
    if (filterBy !== 'all') {
      const genreId = Number(filterBy);
      filtered = filtered.filter(m => m.genre_ids?.includes(genreId));
    }

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(m => 
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    if (sortBy === 'popularity') {
      filtered.sort((a, b) => b.popularity - a.popularity);
    } else if (sortBy === 'vote_average') {
      filtered.sort((a, b) => b.vote_average - a.vote_average);
    } else if (sortBy === 'release_date') {
      filtered.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
    }

    return filtered;
  }, [items, searchQuery, sortBy, filterBy]);

  // Pagination Logic
  const itemsPerPage = 8;
  const totalPages = Math.ceil(processedMovies.length / itemsPerPage);
  const currentMovies = processedMovies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[var(--card)] p-4 rounded-xl border border-[var(--border)] shadow-sm">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search size={18} className="opacity-50" />
          </div>
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>

        <div className="flex w-full md:w-auto gap-4 items-center">
          <select
            value={sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value as RootState['movies']['sortBy']))}
            className="w-full md:w-auto bg-[var(--background)] border border-[var(--border)] rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary appearance-none font-medium cursor-pointer transition-all"
          >
            <option value="popularity">Most Popular</option>
            <option value="vote_average">Top Rated</option>
            <option value="release_date">Newest</option>
          </select>
          
          <button
            onClick={handleAddNew}
            className="shrink-0 flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2.5 rounded-lg font-semibold shadow-sm transition-colors"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">Add Movie</span>
          </button>
        </div>
      </div>

      {/* Genre Filter Chips */}
      {genreStatus === 'succeeded' && genres.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <button
            onClick={() => { dispatch(setFilterBy('all')); dispatch(setPage(1)); }}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              filterBy === 'all'
                ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                : 'bg-[var(--card)] border-[var(--border)] hover:border-primary hover:text-primary'
            }`}
          >
            All
          </button>
          {genres.map(genre => (
            <button
              key={genre.id}
              onClick={() => { dispatch(setFilterBy(String(genre.id))); dispatch(setPage(1)); }}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                filterBy === String(genre.id)
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-[var(--card)] border-[var(--border)] hover:border-primary hover:text-primary'
              }`}
            >
              {genre.name}
            </button>
          ))}
        </div>
      )}

      {/* State Handlers */}
      {status === 'loading' && (
        <div className="flex flex-col items-center justify-center py-20 opacity-60">
          <Loader2 className="animate-spin mb-4" size={48} />
          <p className="text-lg font-medium">Fetching movies...</p>
        </div>
      )}

      {status === 'failed' && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-6 text-center text-red-500">
          <AlertCircle className="mx-auto mb-4" size={48} />
          <h2 className="text-xl font-bold mb-2">Failed to load movies</h2>
          <p>{error}</p>
        </div>
      )}

      {/* Grid */}
      {status === 'succeeded' && currentMovies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-500">
          {currentMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} onEdit={handleEdit} />
          ))}
        </div>
      ) : status === 'succeeded' ? (
        <div className="flex flex-col items-center justify-center text-center py-20 opacity-60">
          <div className="bg-[var(--card)] p-4 rounded-full mb-4 shadow-sm border border-[var(--border)]">
            <Search size={40} className="opacity-50" />
          </div>
          <h2 className="text-2xl font-bold">No movies found</h2>
          <p className="mt-2 text-sm max-w-sm">We couldn't find any movies matching your current filters or search query.</p>
        </div>
      ) : null}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-8">
          <button
            onClick={() => dispatch(setPage(currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border border-[var(--border)] disabled:opacity-50 hover:bg-[var(--card)] transition-colors font-medium"
          >
            Previous
          </button>
          <span className="px-4 py-2 font-medium opacity-70">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => dispatch(setPage(currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border border-[var(--border)] disabled:opacity-50 hover:bg-[var(--card)] transition-colors font-medium"
          >
            Next
          </button>
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
