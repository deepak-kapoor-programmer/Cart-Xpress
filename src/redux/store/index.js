import { configureStore } from '@reduxjs/toolkit';
import productSlice from '../productSlice'
import CartSlice from '../CartSlice'
const store = configureStore({
  reducer: {
    products:productSlice,
    cart:CartSlice
  },
});
export default store;