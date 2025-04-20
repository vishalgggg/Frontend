import { setIsPremium, setLeaderBoard, setDownloadLink } from "../reducers/premiumSlice";
import {
    BUY_PREMIUM_ENDPOINT,
    UPDATE_PREMIUM_ENDPOINT,
    UPDATE_STATUS_FAILED,
    DOWNLOAD_EXPENSE_ENDPOINT,
    GET_DOWNLOADED_FILES
} from "../../api/agent";



import axios from "axios";
import { load } from "@cashfreepayments/cashfree-js";

export const buyPremiumAction = (token) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post(BUY_PREMIUM_ENDPOINT, {}, { headers: { token: token } });
            const orderId = data.order_id; // Assuming your backend returns orderId
            
            let cashfree;
                
            cashfree = await load({
                    mode: "sandbox"
                });
            
            let checkoutOptions = {
                    paymentSessionId: data.order_token,
                    redirectTarget: "_modal",
                };
            const result = await cashfree.checkout(checkoutOptions);
           if(result.error){
            console.log("close popup");
            console.log(result.error);
           }
           if(result.redirect){
            console.log("redirected");
           }
           if(result.paymentDetails){
            console.log("completed");
            console.log(result.paymentDetails.paymentMessage);
            const response = await axios.get(`http://localhost:4000/payment/updatepremiumstatus/${orderId}`, { headers: { token: token } });
            console.log(response)
            console.log("response", response.data);
            if(response.data.status){
            dispatch(setIsPremium());
            alert("You are now a premium member");
            }
           }
            
        } catch (error) {
            console.log(error);
        }
    }
}



export const getLeaderBoardAction = () => {
    return async (dispatch, getState) => {
        try {
            const { data } = await axios.get('http://localhost:4000/premium/getleaderboard')
            dispatch(setLeaderBoard(data))
        } catch (error) {
            console.log(error)
        }
    }
}


// downlaod expenses action 
export const downloadExpensesAction = () => {
    return async (dispatch, getState) => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.get(DOWNLOAD_EXPENSE_ENDPOINT, { headers: { token: token } });

            // getting the downlaod link
            const oldDownlaodLinks = getState().premium.downloadLinks

            // now storing the all links 
            dispatch(setDownloadLink([...oldDownlaodLinks, data]))

            // Open the file URL in a new tab
            window.open(data.downloadLink, "_blank");

        } catch (error) {
            console.log(error);
        }
    }
}


// GET ALL DOWNLOADED FILES

export const getDownloadedExpensesAction = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.get(GET_DOWNLOADED_FILES, { headers: { token: token } });
            dispatch(setDownloadLink(data))
        } catch (error) {
            console.log(error)
        }
    }
}