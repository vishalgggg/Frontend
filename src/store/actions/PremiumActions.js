import { setIsPremium, setLeaderBoard, setDownloadLink } from "../reducers/premiumSlice";
import {
    BUY_PREMIUM_ENDPOINT,
    UPDATE_PREMIUM_ENDPOINT,
    UPDATE_STATUS_FAILED,
    DOWNLOAD_EXPENSE_ENDPOINT,
    GET_DOWNLOADED_FILES
} from "../../api/agent";
import axios from "axios";

export const buyPremiumAction = (token) => {
    return async (dispatch) => {

        try {
            const { data } = await axios.post(BUY_PREMIUM_ENDPOINT, {}, { headers: { token: token } });
            const options = {
                key: data.key_id,
                order_id: data.order.id,
                handler: async (response) => {
                    try {
                        await axios.post(
                            UPDATE_PREMIUM_ENDPOINT,
                            {
                                order_id: options.order_id,
                                payment_id: response.razorpay_payment_id,
                            },
                            { headers: { token: token } }
                        );
                        dispatch(setIsPremium())
                        alert("You are now a premium member");

                    } catch (error) {
                        console.log(error);
                    }
                },
            };

            const rzp1 = new Razorpay(options);
            rzp1.open();

            rzp1.on("payment.failed", async (res) => {
                try {
                    await axios.post(UPDATE_STATUS_FAILED, { order_id: options.order_id, }, { headers: { token: token } });
                } catch (error) {
                    console.log(error)
                }
            });

        } catch (error) {
            console.log(error);
        }
    }
}




export const getLeaderBoardAction = () => {
    return async (dispatch, getState) => {
        try {
            const { data } = await axios.get('premium/getleaderboard')
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