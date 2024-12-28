import { createSlice } from "@reduxjs/toolkit";
import {aboutUser, createUser, loginUser} from "../thunks/userThunk";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: {},
        cart: [],
        status: 'idle',
        error: null,
        isLoading: false,
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
    },

    extraReducers: (builder) => {
        builder
            .addCase(createUser.fulfilled, (state) => {
                state.isLoading = false;
                state.status = 'succeeded';
                state.haveToken = true;
            })
            .addCase(loginUser.fulfilled, (state) => {
                state.isLoading = false;
                state.status = 'succeeded';
            })
            .addCase(aboutUser.fulfilled, (state, { paylaod } ) => {
                state.isLoading = false;
                state.status = 'succeeded';
                state.currentUser = paylaod;
            })
    }
});

export const { addItemToCart } = userSlice.actions;
export default userSlice.reducer;