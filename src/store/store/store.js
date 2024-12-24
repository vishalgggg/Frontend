import { configureStore } from "@reduxjs/toolkit";
import expenseSlice from "../reducers/expenseSlice";
import authSlice from "../reducers/authSlice";
import premiumSlice from "../reducers/premiumSlice";

const store = configureStore({
    reducer: {
        expenses: expenseSlice,
        auth: authSlice,
        premium: premiumSlice
    }
})

export default store
