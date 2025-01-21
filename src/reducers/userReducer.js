import { createSlice } from "@reduxjs/toolkit";
import { createUser, loginUser, aboutUser } from "../thunks/userThunk.js";

const loadStateFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('userState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        return e;
    }
};

const saveStateToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('userState', serializedState);
    } catch (e) {
        return e;
    }
};

const userSlice = createSlice({
    name: "user",
    initialState: loadStateFromLocalStorage() || {
        currentUser: null,
        cart: [],
        favorite: [],
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
            saveStateToLocalStorage(state);
        },

        removeItemFromCart: (state, action) => {
            state.cart = state.cart.filter(item => item.id !== action.payload.id || item.size !== action.payload.size);
            saveStateToLocalStorage(state);
        },

        increaseQuantity: (state, action) => {
            state.cart = state.cart.map((item) =>
                item.id === action.payload.id && item.size === action.payload.size
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            saveStateToLocalStorage(state);
        },

        decreaseQuantity: (state, action) => {
            state.cart = state.cart.map((item) =>
                item.id === action.payload.id && item.size === action.payload.size
                    ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
                    : item
            );
            saveStateToLocalStorage(state);
        },

        logoutUser: (state) => {
            state.currentUser = null;
            state.cart = [];
            state.favorite = [];
            state.auth_tokens = null;
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('userState');
        },

        addItemToFavorite: (state, action) => {
            let newFavorite = [...state.favorite];
            const found = state.favorite.find((item) => item.id === action.payload.id && item.size === action.payload.size);

            if (found) {
                newFavorite = newFavorite.map((item) =>
                    item.id === action.payload.id && item.size === action.payload.size
                        ? { ...item, quantity: item.quantity + action.payload.quantity }
                        : item
                );
            } else {
                newFavorite.push({ ...action.payload, quantity: action.payload.quantity });
            }

            state.favorite = newFavorite;
            saveStateToLocalStorage(state);
        },

        removeItemFromFavorite: (state, action) => {
            state.favorite = state.favorite.filter(item => item.id !== action.payload.id || item.size !== action.payload.size);
            saveStateToLocalStorage(state);
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(createUser.fulfilled, (state) => {
                state.isLoading = false;
                state.status = 'succeeded';
                state.haveToken = true;
                saveStateToLocalStorage(state);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false;
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = 'succeeded';
                state.auth_tokens = action.payload;
                saveStateToLocalStorage(state);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(aboutUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentUser = action.payload;
                saveStateToLocalStorage(state);
            })
            .addCase(aboutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const {
    addItemToCart,
    removeItemFromCart,
    increaseQuantity,
    decreaseQuantity,
    logoutUser,
    removeItemFromFavorite,
    addItemToFavorite
} = userSlice.actions;

export default userSlice.reducer;