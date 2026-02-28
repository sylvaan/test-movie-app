import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { X } from 'lucide-react';
import { type Movie } from '../types/movie';
import { addMovie, updateMovie } from '../features/movies/moviesSlice';

interface MovieModalProps {
  isOpen: boolean;
  onClose: () => void;
  movieToEdit: Movie | null;
}

export default function MovieModal({ isOpen, onClose, movieToEdit }: MovieModalProps) {
  const dispatch = useDispatch();
  
  const defaultFormState = {
    title: '',
    overview: '',
    poster_path: '',
    release_date: '',
    vote_average: 0,
    popularity: 0,
  };

  const [formData, setFormData] = useState(defaultFormState);

  useEffect(() => {
    if (movieToEdit) {
      const fullPosterUrl = movieToEdit.poster_path?.startsWith('/')
        ? `https://image.tmdb.org/t/p/w500${movieToEdit.poster_path}`
        : movieToEdit.poster_path;
      setFormData({
        title: movieToEdit.title,
        overview: movieToEdit.overview,
        poster_path: fullPosterUrl,
        release_date: movieToEdit.release_date,
        vote_average: movieToEdit.vote_average,
        popularity: movieToEdit.popularity,
      });
    } else {
      setFormData(defaultFormState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'vote_average' || name === 'popularity' ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (movieToEdit) {
      dispatch(updateMovie({
        ...movieToEdit,
        ...formData
      }));
    } else {
      dispatch(addMovie({
        id: Date.now(), // simple unique id generator
        genre_ids: [],
        ...formData
      }));
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[var(--card)] w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-[var(--border)]">
          <h2 className="text-xl font-bold">
            {movieToEdit ? 'Edit Movie' : 'Add New Movie'}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-[var(--border)] rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium opacity-80">Title</label>
            <input 
              required
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium opacity-80">Overview / Synopsis</label>
            <textarea 
              required
              name="overview"
              value={formData.overview}
              onChange={handleChange}
              rows={4}
              className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium opacity-80">Poster Image URL</label>
            <input 
              required
              type="text"
              name="poster_path"
              value={formData.poster_path}
              onChange={handleChange}
              placeholder="https://image.tmdb.org/t/p/w500/..."
              className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
            {formData.poster_path && (
              <div className="mt-2 flex items-center gap-3">
                <img
                  src={formData.poster_path}
                  alt="Preview"
                  className="h-20 w-14 object-cover rounded-lg border border-[var(--border)] bg-[var(--border)]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    const sibling = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
                    if (sibling) sibling.style.display = 'flex';
                  }}
                  onLoad={(e) => {
                    (e.target as HTMLImageElement).style.display = 'block';
                    const sibling = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
                    if (sibling) sibling.style.display = 'none';
                  }}
                />
                <div className="h-20 w-14 items-center justify-center rounded-lg border border-red-500/50 bg-red-500/10 text-red-500 text-xs text-center p-1" style={{display:'none'}}>
                  Invalid URL
                </div>
                <p className="text-xs opacity-60">Make sure the URL points directly to an image file.</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium opacity-80">Release Date</label>
              <input 
                required
                type="date"
                name="release_date"
                value={formData.release_date}
                onChange={handleChange}
                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium opacity-80">Rating (0-10)</label>
              <input 
                required
                type="number"
                step="0.1"
                min="0"
                max="10"
                name="vote_average"
                value={formData.vote_average}
                onChange={handleChange}
                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-[var(--border)] flex justify-end gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg border border-[var(--border)] hover:bg-[var(--border)] transition-colors font-medium"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-bold shadow-md"
            >
              Save Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
