import { createSlice } from '@reduxjs/toolkit';

const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    storeCard: [],
    counter: 0
  },
  reducers: {
    AddToCart: (state, action) => {
      state.storeCard.push(action.payload);
      state.counter++;
    },
    RemoveFromCart: (state, action) => {
      // state.filter((item) => {
      //   item.id !== action.payload.id;
      // })
      state.storeCard = state.storeCard.filter((item) => item.id !== action.payload.id);
      state.counter--;
    }

  },
});

export const { AddToCart, RemoveFromCart } = CartSlice.actions;
export default CartSlice.reducer;
