import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { type Movie } from "../../data/mockMovies";
import axios from "axios";

interface MoviesState {
  items: Movie[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  searchQuery: string;
  sortBy: "popularity" | "vote_average" | "release_date";
  filterBy: string; // 'all' or specific genre
  currentPage: number;
}

const initialState: MoviesState = {
  items: [],
  status: "idle",
  error: null,
  searchQuery: "",
  sortBy: "popularity",
  filterBy: "all",
  currentPage: 1,
};

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  if (!apiKey)
    throw new Error(
      "VITE_TMDB_API_KEY is not defined in environment variables",
    );

  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/popular`,
    {
      params: {
        api_key: apiKey,
        language: "en-US",
        page: 1,
      },
    },
  );

  // Return the fetched movies array
  return response.data.results as Movie[];
});

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovie: (state, action: PayloadAction<Movie>) => {
      // Add new movie at the beginning
      state.items.unshift(action.payload);
    },
    updateMovie: (state, action: PayloadAction<Movie>) => {
      const index = state.items.findIndex((m) => m.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteMovie: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((m) => m.id !== action.payload);
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1; // Reset to page 1 on search
    },
    setSortBy: (state, action: PayloadAction<MoviesState["sortBy"]>) => {
      state.sortBy = action.payload;
    },
    setFilterBy: (state, action: PayloadAction<string>) => {
      state.filterBy = action.payload;
      state.currentPage = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Only update if currently empty to avoid overwriting user's local edits in memory
        if (state.items.length === 0) {
          state.items = action.payload;
        }
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch movies";
      });
  },
});

export const {
  addMovie,
  updateMovie,
  deleteMovie,
  setSearchQuery,
  setSortBy,
  setFilterBy,
  setPage,
} = moviesSlice.actions;

export default moviesSlice.reducer;
