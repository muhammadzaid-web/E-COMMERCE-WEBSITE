import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product-list/ProductListSlice';
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/Cart/CartSlice";
import orderReducer from '../features/order/OrderSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth:authReducer,
    cart:cartReducer,
    order:orderReducer
  },
});
