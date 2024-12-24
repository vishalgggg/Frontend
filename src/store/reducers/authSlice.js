import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: { isUserLoggedIn: false },
    reducers: {
        setUserLogin(state) {
            state.isUserLoggedIn = true
        },

        setUserLogOut(state) {
            state.isUserLoggedIn = false
        }
    }
})


export default authSlice.reducer
export const { setUserLogOut, setUserLogin } = authSlice.actions