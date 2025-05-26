import { createSlice } from "@reduxjs/toolkit"

// ======================================================
// cartSlice - Redux slice for managing the shopping cart state.
// Handles adding, reducing, removing items, and clearing the cart with localStorage persistence.
// ======================================================

const initialState = {
    arr: JSON.parse(localStorage.getItem("cart")) || []
}
const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            let index = state.arr.findIndex(item => item._id == action.payload._id)
            if (index > -1)
                state.arr[index].quantity++;
            else
                state.arr.push({ ...action.payload, quantity: 1 })
            localStorage.setItem("cart", JSON.stringify(state.arr));
        },
        reductionFromCart: (state, action) => {
            let index = state.arr.findIndex(item => item._id == action.payload._id)
            if (state.arr[index].quantity == 1)
                state.arr.splice(index, 1);
            else
                state.arr[index].quantity--;
            localStorage.setItem("cart", JSON.stringify(state.arr));
        },
        removeFromCart: (state, action) => {
            let index = state.arr.findIndex(item => item._id == action.payload._id)
            state.arr.splice(index, 1);
            localStorage.setItem("cart",JSON.stringify(state.arr))  ;  
        },
        clearCart: (state) => {
            state.arr = [];
            localStorage.removeItem("cart");

        }
    }
})
export const { addToCart, reductionFromCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;