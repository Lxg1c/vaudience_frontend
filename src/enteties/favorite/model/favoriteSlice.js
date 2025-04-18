import { createSlice } from "@reduxjs/toolkit";
import { saveStateToLocalStorage } from "@/shared/lib/localStorage.js";

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    name: "favorite",
    favorite: [],
    isLoading: false,
    status: "idle",
    error: null,
  },
  reducers: {
    addItemToFavorite: (state, action) => {
      let newFavorite = [...state.favorite];
      const found = state.favorite.find(
        (item) => item.id === action.payload.id && item.size === action.payload.size,
      );

      if (found) {
        newFavorite = newFavorite.map((item) =>
          item.id === action.payload.id && item.size === action.payload.size
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item,
        );
      } else {
        newFavorite.push({ ...action.payload, quantity: action.payload.quantity });
      }

      state.favorite = newFavorite;
      saveStateToLocalStorage(state);
    },

    removeItemFromFavorite: (state, action) => {
      state.favorite = state.favorite.filter(
        (item) => item.id !== action.payload.id || item.size !== action.payload.size,
      );
      saveStateToLocalStorage(state);
    },
  },
});

export const { addItemToFavorite, removeItemFromFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
