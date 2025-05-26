import { createSlice } from "@reduxjs/toolkit";

// ======================================================
// userSlice - Redux slice for managing user authentication state.
// Handles user login, logout, and clearing user data with localStorage persistence.
// ======================================================

const initialState = {
    currentUser: JSON.parse(localStorage.getItem("user"))||
    null,
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userIn: (state, action) => {
            state.currentUser = action.payload;
            localStorage.setItem("user",JSON.stringify(state.currentUser));
        },
        userOut: (state) => {
            state.currentUser = null;
            localStorage.removeItem("user");
        },
        clearUser: (state) => {
            state.currentUser = null;
            localStorage.removeItem("user");
        }
    }
})
export const { userIn, userOut, clearUser } = userSlice.actions;
export default userSlice.reducer;