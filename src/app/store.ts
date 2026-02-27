import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../features/movies/moviesSlice";
import bookmarksReducer from "../features/bookmarks/bookmarksSlice";
import genresReducer from "../features/genres/genresSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    bookmarks: bookmarksReducer,
    genres: genresReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
