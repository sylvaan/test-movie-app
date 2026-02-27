import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Genre {
  id: number;
  name: string;
}

interface GenresState {
  items: Genre[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: GenresState = {
  items: [],
  status: "idle",
};

export const fetchGenres = createAsyncThunk("genres/fetchGenres", async () => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const response = await axios.get(
    "https://api.themoviedb.org/3/genre/movie/list",
    { params: { api_key: apiKey, language: "en-US" } },
  );
  return response.data.genres as Genre[];
});

const genresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGenres.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchGenres.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default genresSlice.reducer;
