import { createSlice } from "@reduxjs/toolkit";
import userService from '../services/users'

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

export const initializeUsers = () => {
    return async dispatch => {
        const users = await userService.getAll()
        dispatch(setUsers(users))
    }
}

export default userSlice.reducer