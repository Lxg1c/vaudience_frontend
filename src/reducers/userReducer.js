import { createSlice } from "@reduxjs/toolkit";
import { createUser, loginUser, aboutUser } from "../thunks/userThunk.js"

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        cart: [],
        status: 'idle',
        error: null,
        isLoading: false,
        auth_tokens: null
    },
    reducers: {
        addItemToCart: (state, action) => {
            let newCart = [...state.cart];
            const found = state.cart.find((item) => item.id === action.payload.id && item.size === action.payload.size);

            if (found) {
                newCart = newCart.map((item) =>
                    item.id === action.payload.id && item.size === action.payload.size
                        ? { ...item, quantity: item.quantity + action.payload.quantity }
                        : item
                );
            } else {
                newCart.push({ ...action.payload, quantity: action.payload.quantity });
            }

            state.cart = newCart;
        },
        logoutUser: (state) => {
            state.currentUser = null;
            state.cart = [];
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(createUser.fulfilled, (state) => {
                state.isLoading = false;
                state.status = 'succeeded';
                state.haveToken = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = 'succeeded';
                state.auth_tokens = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(aboutUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentUser = action.payload;
            })
    }
});

export const { addItemToCart, logoutUser} = userSlice.actions;
export default userSlice.reducer;