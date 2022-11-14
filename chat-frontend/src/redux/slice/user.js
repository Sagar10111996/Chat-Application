import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isUserLoggedIn: false,
    isSignInDisplayed: false,
    details: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLoggedInUserDetails: (state, action) => {
            state.details = action.payload
        },
        setLoginStatus: (state, action) => {
            state.isUserLoggedIn = action.payload
        },
    }
})

export const { setLoggedInUserDetails, setLoginStatus } = userSlice.actions
export default userSlice.reducer