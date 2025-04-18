import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "../api/api.js";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    list: [],
    status: "idle",
    activeCategory: null,
    error: null,
    isLoading: false,
  },
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.status = "loading";
      state.isLoading = true;
    });

    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.list = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getCategories.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export const { setActiveCategory } = categorySlice.actions;
export default categorySlice.reducer;
