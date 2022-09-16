import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../types';

import { RootState } from './Store';

const initialState = {
  products: [] as IProduct[],
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<IProduct>) => {
      state.products.push(action.payload);
    },
  },
});

export const { addToBasket } = basketSlice.actions;

export const selectBasket = (state: RootState) => state.basket;

export default basketSlice.reducer;
