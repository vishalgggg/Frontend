import { createSlice } from "@reduxjs/toolkit";

const premiumSlice = createSlice({
    name: "premium slice",
    initialState: { isPremiumUser: false, leaderBoard: [], downloadLinks: [] },
    reducers: {
        setIsPremium(state) {
            state.isPremiumUser = true
        },
        setLeaderBoard(state, action) {
            state.leaderBoard = action.payload
        },
        setDownloadLink(state, action) {
            state.downloadLinks = action.payload
        }
    }
})


export default premiumSlice.reducer
export const { setIsPremium, setLeaderBoard, setDownloadLink } = premiumSlice.actions