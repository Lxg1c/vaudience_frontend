import { createSlice } from "@reduxjs/toolkit";
import { getProducts} from "../../../enteties/product/index.js";

const productSlice = createSlice({
    name: "products",
    initialState: {
        list: [],
        filtered: [],
        status: 'idle',
        error: null,
        isLoading: false
    },
    reducers: {
        filterByCategory: (state, action) => {
            state.filtered = state.list.filter(product => product.category.name === action.payload);
        },
        resetFilter: (state) => {
            state.filtered = state.list;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.status = 'loading';
            state.isLoading = true;
        })

        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.list = action.payload;
            state.filtered = action.payload;
            state.isLoading = false;
        })

        builder.addCase(getProducts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
            state.isLoading = false;
        });
    },
});

export const {filterByCategory, resetFilter} = productSlice.actions;

export default productSlice.reducer;