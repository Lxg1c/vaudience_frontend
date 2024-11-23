import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: [],
        cart: [],
        status: 'idle',
        error: null,
        isLoading: false
    },
    reducers: {
        addItemToCart: (state, action) => {
            let newCart = [...state.cart];
            const found = state.cart.find((item) => item.id === action.payload.id && item.size === action.payload.size);

            if (found) {
                newCart = newCart.map((item) => {
                    return item.id === action.payload.id && item.size === action.payload.size ? { ...item,
                        quantity: item.quantity + action.payload.quantity } : item;
                });
            } else {
                newCart.push({ ...action.payload, quantity: action.payload.quantity });
            }

            state.cart = newCart;
        }
    },
});

export const { addItemToCart } = userSlice.actions;
export default userSlice.reducer;