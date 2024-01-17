import { createSlice } from "@reduxjs/toolkit"

const initialState = 'Initial state'

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification(state, action) {
            return action.payload
        },
        clearNotification() {
            return ''
        }
    },
})

export const { showNotification, clearNotification } = notificationSlice.actions

export const setNotification = (text, time) => {
    return async dispatch => {
        dispatch(showNotification(text))
        setTimeout(() => {
            dispatch(clearNotification())
        }, time * 1000)
    }
}

export default notificationSlice.reducer