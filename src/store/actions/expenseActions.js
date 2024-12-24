import axios from "axios";
import { setExpenses } from "../reducers/expenseSlice";
import { ADD_EXPENSE_ENDPOINT, DELETE_EXPENSE_ENDPOINT, GET_EXPENSES_ENDPOINT } from "../../api/agent";
import { setIsPremium } from "../reducers/premiumSlice";

// for storing a new expense
export const setExpensesAction = (expense) => {
    return async (dispatch, getState) => {
        try {
            const token = localStorage.getItem('token')
            const { data } = await axios.post(ADD_EXPENSE_ENDPOINT, expense, { headers: { token: token } })
            if (data) {
                expense.id = data.id
                const prevExpenses = getState().expenses.expenses
                const { expensesLength } = getState().expenses
                const newExpenses = [...prevExpenses, expense]
                dispatch(setExpenses({ expenses: newExpenses, expensesLength: expensesLength + 1 }))
            }

        } catch (err) {
            console.log(err);
        }
    }
}


// for getting all the expenses
export const getExpensesAction = (rowsperpage, page) => {
    console.log(rowsperpage, page)
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token')
            const { data } = await axios.get(`user/getexpenses?rowsperpage=${rowsperpage}&page=${page + 1}`, { headers: { token: token } })
            if (data) {
                dispatch(setExpenses({ expenses: data.expenses, expensesLength: data.expensesLength }))
                if (data.isPremiumUser) {
                    dispatch(setIsPremium())
                }
            }

        } catch (error) {
            console.log(error)
        }
    }
}



// for deleting the expense by using the id 
export const deleteExpenseAction = (id) => {
    return async (dispatch, getState) => {
        try {
            const token = localStorage.getItem('token')
            const { data } = await axios.delete(DELETE_EXPENSE_ENDPOINT, { data: { id: id }, headers: { token: token } })
            if (data) {
                const allExpenses = getState().expenses.expenses
                const { expensesLength } = getState().expenses
                const filteredExpenses = allExpenses.filter(val => val.id !== id)
                dispatch(setExpenses({ expenses: filteredExpenses, expensesLength: expensesLength - 1 }))
            }
        } catch (error) {
            console.log(error)
        }
    }
}

