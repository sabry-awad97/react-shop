import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  getProduct as getProductFromAPI,
  getProducts as getProductsFromAPI,
} from '../api';
import { IProduct } from '../types';
import { RootState } from './Store';

const initialState = {
  products: [] as IProduct[],
  productsLoading: false,
  currentProduct: null as IProduct | null,
};

export const getProducts = createAsyncThunk<IProduct[], void>(
  'products/fetchAll',
  async () => {
    const products = await getProductsFromAPI();
    return products;
  }
);

export const getProduct = createAsyncThunk<IProduct | null, number>(
  'products/getSingle',
  async (id: number) => {
    const product = await getProductFromAPI(id);
    return product;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    loading: state => {
      state.productsLoading = true;
    },
  },
  extraReducers(builder) {
    builder.addCase(getProducts.pending, state => {
      state.productsLoading = true;
    });
    builder.addCase(
      getProducts.fulfilled,
      (state, action: PayloadAction<IProduct[]>) => {
        state.products = action.payload;
        state.productsLoading = false;
      }
    );
    builder.addCase(getProduct.pending, state => {
      state.productsLoading = true;
    });
    builder.addCase(
      getProduct.fulfilled,
      (state, action: PayloadAction<IProduct | null>) => {
        state.currentProduct = action.payload;
        state.productsLoading = false;
      }
    );
  },
});

export const selectProducts = (state: RootState) => state.products;

export const { loading } = productSlice.actions;

export default productSlice.reducer;
