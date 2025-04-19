import { createSlice } from "@reduxjs/toolkit";
import { saveStateToLocalStorage } from "@/shared/lib/localStorage.js";
import {
    addToFavorite,
    getFavorites,
    removeFromFavorite,
} from "@/enteties/favorite/index.js";

const favoriteSlice = createSlice({
    name: "favorite",
    initialState: {
        favorite: [],
        isLoading: false,
        status: "idle",
        error: null,
    },
    reducers: {
        clearFavorite: (state) => {
            state.favorite = [];
            state.isLoading = false;
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFavorites.pending, (state) => {
                state.isLoading = true;
                state.status = "loading";
            })
            .addCase(getFavorites.fulfilled, (state, action) => {
                state.isLoading = false;
                state.favorite = action.payload;
                state.status = "fulfilled";
            })
            .addCase(getFavorites.rejected, (state, action) => {
                state.isLoading = false;
                state.status = "rejected";
                state.error = action.payload;
            })

            .addCase(addToFavorite.pending, (state) => {
                state.isLoading = true;
                state.status = "loading";
            })
            .addCase(addToFavorite.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = "fulfilled";

                const found = state.favorite.find(
                    (item) =>
                        item.id === action.payload.id && item.size === action.payload.size
                );

                if (found) {
                    state.favorite = state.favorite.map((item) =>
                        item.id === action.payload.id && item.size === action.payload.size
                            ? {
                                ...item,
                                quantity: item.quantity + action.payload.quantity,
                            }
                            : item
                    );
                } else {
                    state.favorite.push({ ...action.payload, quantity: action.payload.quantity });
                }

                saveStateToLocalStorage(state);
            })
            .addCase(addToFavorite.rejected, (state, action) => {
                state.isLoading = false;
                state.status = "rejected";
                state.error = action.payload;
            })

            .addCase(removeFromFavorite.pending, (state) => {
                state.isLoading = true;
                state.status = "loading";
            })
            .addCase(removeFromFavorite.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = "fulfilled";
                state.favorite = state.favorite.filter(
                    (item) =>
                        item.id !== action.payload.id ||
                        item.size !== action.payload.size
                );
                saveStateToLocalStorage(state);
            })
            .addCase(removeFromFavorite.rejected, (state, action) => {
                state.isLoading = false;
                state.status = "rejected";
                state.error = action.payload;
            });
    },
});

export const { clearFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
