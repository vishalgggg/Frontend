import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
    name: "expenses",
    initialState: { expenses: [], expensesLength: 0 },
    reducers: {
        setExpenses(state, action) {
            state.expenses = action.payload.expenses
            state.expensesLength = action.payload.expensesLength
        },

    }
})

export const { setExpenses } = expenseSlice.actions
export default expenseSlice.reducer