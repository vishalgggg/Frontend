import axios from "axios"
import { setUserLogin } from "../reducers/authSlice"
import { setUserLogOut } from "../reducers/authSlice"
import { FORGOT_PWD_ENDPOINT } from "../../api/agent"

export const loginAction = () => {
    return (dispatch) => {
        dispatch(setUserLogin())
    }

}


export const logOutAction = () => {
    return (dispatchEvent) => {
        dispatchEvent(setUserLogOut())
    }
}


export const forgotpwdAction = (email) => {
    return async () => {
        try {
            const { data } = await axios.post(FORGOT_PWD_ENDPOINT, { email })
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
}
