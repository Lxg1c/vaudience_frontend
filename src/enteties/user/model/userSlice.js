import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, aboutUser, refreshToken } from "@/enteties/user";
import { saveNewUserData } from "../index.js";
import { loadStateFromLocalStorage, saveStateToLocalStorage } from "@/shared/lib/localStorage.js";

const clearStorage = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("userState");
  sessionStorage.removeItem("access_token");
  sessionStorage.removeItem("refresh_token");
  sessionStorage.removeItem("userState");
};

const userSlice = createSlice({
  name: "user",
  initialState: loadStateFromLocalStorage() || {
    currentUser: null,
    status: "idle",
    error: null,
    isLoading: false,
    auth_tokens: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.currentUser = null;
      state.auth_tokens = null;
      clearStorage();
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.status = "succeeded";
        state.haveToken = true;
        saveStateToLocalStorage(state);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "succeeded";
        state.auth_tokens = action.payload;
        saveStateToLocalStorage(state);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(aboutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(aboutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        saveStateToLocalStorage(state);
      })
      .addCase(aboutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(saveNewUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveNewUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(saveNewUserData.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshToken.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
