// API endpoints for premium purchase
export const BUY_PREMIUM_ENDPOINT = "payment/buypremium";
export const UPDATE_PREMIUM_ENDPOINT = "payment/updatepremiumstatus";
export const UPDATE_STATUS_FAILED = "payment/updatepremiumstatustofailed"
export const DOWNLOAD_EXPENSE_ENDPOINT = "premium/downloadexpenses"
export const GET_DOWNLOADED_FILES = "premium/alldownlaodlinks"

// API endpoints for EXPENSES
export const ADD_EXPENSE_ENDPOINT = "user/addexpense"
export const DELETE_EXPENSE_ENDPOINT = "user/deleteexpense"
export const GET_EXPENSES_ENDPOINT = "user/getexpenses?rowsperpage=10&page=1"


// API endPoints for premium user 
export const GET_LEADERBOARD_DATA = "premium/getleaderboard"


// API endpoints for authentication
export const FORGOT_PWD_ENDPOINT = "auth/forgotpassword"