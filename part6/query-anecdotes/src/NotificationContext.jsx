/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react"

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "NEW_ANECDOTE": return `Created new anecdote: ${action.payload}`
        case "VOTE": return `Voted for anecdote: ${action.payload}`
        case "REMOVE": return ''
        default: return ''
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext