import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BookmarkPlus, BookmarkCheck, Star, Edit, Trash2 } from 'lucide-react';
import { type Movie } from '../data/mockMovies';
import { toggleBookmark } from '../features/bookmarks/bookmarksSlice';
import { deleteMovie } from '../features/movies/moviesSlice';
import type { RootState } from '../app/store';

interface MovieCardProps {
  movie: Movie;
  onEdit: (movie: Movie) => void;
}

export default function MovieCard({ movie, onEdit }: MovieCardProps) {
  const dispatch = useDispatch();
  const bookmarkedIds = useSelector((state: RootState) => state.bookmarks.bookmarkedIds);
  const isBookmarked = bookmarkedIds.includes(movie.id);
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleToggleBookmark = () => {
    dispatch(toggleBookmark(movie.id));
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      dispatch(deleteMovie(movie.id));
    }
  };

  return (
    <div className="group relative rounded-xl overflow-hidden bg-[var(--card)] border border-[var(--border)] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
      {/* Poster Image */}
      <div className="aspect-[2/3] w-full overflow-hidden bg-[var(--border)] relative">
        {/* Shimmer skeleton shown while image is loading */}
        {!imgLoaded && (
          <div className="absolute inset-0 z-10 animate-pulse bg-gradient-to-br from-[var(--border)] via-[var(--card)] to-[var(--border)]" />
        )}
        <img
          src={movie.poster_path?.startsWith('/') 
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
            : movie.poster_path}
          alt={movie.title}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImgLoaded(true)}
          onError={(e) => {
            setImgLoaded(true);
            (e.target as HTMLImageElement).src = `https://placehold.co/400x600/1e293b/ffffff?text=${encodeURIComponent(movie.title)}`;
          }}
        />
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            onClick={handleToggleBookmark}
            className="p-2 backdrop-blur-md bg-black/40 text-white rounded-full hover:bg-black/60 transition-colors shadow-lg"
            aria-label={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
          >
            {isBookmarked ? (
              <BookmarkCheck size={20} className="text-primary fill-primary" />
            ) : (
              <BookmarkPlus size={20} />
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="font-bold text-lg leading-tight line-clamp-2" title={movie.title}>
            {movie.title}
          </h3>
          <div className="flex items-center gap-1.5 bg-yellow-500/10 text-yellow-600 px-2 py-1 rounded-md text-sm font-semibold shrink-0">
            <Star size={14} className="fill-yellow-600" />
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>

        <p className="text-sm opacity-70 mb-4 flex-grow line-clamp-3">
          {movie.overview}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--border)]">
          <span className="text-xs font-medium opacity-60">
            {new Date(movie.release_date).getFullYear() || 'Unknown'}
          </span>
          
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(movie)}
              className="p-1.5 text-blue-500 hover:bg-blue-500/10 rounded transition-colors"
              title="Edit Movie"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={handleDelete}
              className="p-1.5 text-red-500 hover:bg-red-500/10 rounded transition-colors"
              title="Delete Movie"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
