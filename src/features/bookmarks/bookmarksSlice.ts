import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface BookmarksState {
  bookmarkedIds: number[];
}

const initialState: BookmarksState = {
  bookmarkedIds: [], // Alternatively load from localStorage here
};

const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    toggleBookmark: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const index = state.bookmarkedIds.indexOf(id);
      if (index >= 0) {
        state.bookmarkedIds.splice(index, 1);
      } else {
        state.bookmarkedIds.push(id);
      }
    },
  },
});

export const { toggleBookmark } = bookmarksSlice.actions;

export default bookmarksSlice.reducer;
