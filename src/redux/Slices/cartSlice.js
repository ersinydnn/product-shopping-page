import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
  try {
    const cartData = localStorage.getItem("cart");
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error("Sepet verisi yüklenirken hata oluştu:", error);
    return [];
  }
};

const saveCartToLocalStorage = (cart) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Sepet verisi kaydedilirken hata oluştu:", error);
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromLocalStorage(),
  reducers: {
    add(state, action) {
      state.push(action.payload);
      saveCartToLocalStorage(state);
    },
    remove(state, action) {
      const updatedCart = state.filter((item) => item.id !== action.payload);
      saveCartToLocalStorage(updatedCart);
      return updatedCart;
    },
    clearCart() {
      saveCartToLocalStorage([]);
      return [];
    },
  },
});

export const { add, remove, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
