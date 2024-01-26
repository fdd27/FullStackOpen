import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        appendBlogs(state, action) {
            state.push(action.payload)
        },
        setBlogs(state, action) {
            return action.payload
        }
    }
})

export const { appendBlogs, setBlogs } = blogSlice.actions
export default blogSlice.reducer