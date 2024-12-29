// API endpoints for premium purchase
export const BUY_PREMIUM_ENDPOINT = "http://localhost:4000/payment/buypremium";
export const UPDATE_PREMIUM_ENDPOINT = "http://localhost:4000/payment/updatepremiumstatus";
export const UPDATE_STATUS_FAILED = "http://localhost:4000/payment/updatepremiumstatustofailed"
export const DOWNLOAD_EXPENSE_ENDPOINT = "http://localhost:4000/premium/downloadexpenses"
export const GET_DOWNLOADED_FILES = "http://localhost:4000/premium/alldownlaodlinks"

// API endpoints for EXPENSES
export const ADD_EXPENSE_ENDPOINT = "http://localhost:4000/user/addexpense"
export const DELETE_EXPENSE_ENDPOINT = "http://localhost:4000/user/deleteexpense"
export const GET_EXPENSES_ENDPOINT = "http://localhost:4000/user/getexpenses?rowsperpage=10&page=1"


// API endPoints for premium user 
export const GET_LEADERBOARD_DATA = "http://localhost:4000/premium/getleaderboard"


// API endpoints for authentication
export const FORGOT_PWD_ENDPOINT = "http://localhost:4000/auth/forgotpassword"