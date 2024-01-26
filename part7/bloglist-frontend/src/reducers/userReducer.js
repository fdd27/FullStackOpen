import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        setUsers(state, action) {
            return action.payload
        },
        appendUsers(state, action) {
            state.push(action.payload)
        }
    }
})

export const { setUsers, appendUsers } = userSlice.actions
export default userSlice.reducer