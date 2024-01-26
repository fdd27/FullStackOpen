import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: 'login',
    initialState: null,
    reducers: {
        logIn(state, action) {
            return action.payload
        },
        logOut(state, action) {
            return null
        }
    }
})

export const { logIn, logOut } = loginSlice.actions
export default loginSlice.reducer