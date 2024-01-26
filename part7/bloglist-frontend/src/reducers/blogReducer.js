import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        appendBlog(state, action) {
            state.push(action.payload)
        },
        setBlogs(state, action) {
            return action.payload
        }
    }
})

export const { appendBlog, setBlogs } = blogSlice.actions
export default blogSlice.reducer