import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    // כל פריט: { id, name, price, image, category, quantity }
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const plant = action.payload; // צפוי: { id, name, price, image, category }
      const existing = state.items.find((it) => it.id === plant.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...plant, quantity: 1 });
      }
    },

    removeItem: (state, action) => {
      const id = action.payload; // צפוי: plantId
      state.items = state.items.filter((it) => it.id !== id);
    },

    updateQuantity: (state, action) => {
      const { id, delta } = action.payload; // delta יכול להיות +1 או -1
      const it = state.items.find((x) => x.id === id);
      if (!it) return;

      it.quantity += delta;

      // אם הכמות ירדה לפחות או שווה 0 — להסיר מהעגלה
      if (it.quantity <= 0) {
        state.items = state.items.filter((x) => x.id !== id);
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;
