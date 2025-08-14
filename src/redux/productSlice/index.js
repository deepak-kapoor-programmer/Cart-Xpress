import { createSlice } from '@reduxjs/toolkit';
const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],     
    skip: 0   ,  
  },
  reducers: {
    appendProducts: (state, action) => {
      state.items = [...state.items, ...action.payload.products]; // Add new products to the list
      state.skip += 10; // Move to next 10
    },
  },
});

export const { appendProducts } = productSlice.actions;
export default productSlice.reducer;
