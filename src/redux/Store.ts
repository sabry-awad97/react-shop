import { configureStore } from '@reduxjs/toolkit';

import basketReducer from './basket-reducer';
import productsReducer from './ProductsReducer';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    basket: basketReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
