import { createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        appendBlogs(state, action) {
            state.push(action.payload)
        },
        setBlogs(state, action) {
            return action.payload
        },
        appendComment(state, action) {
            state.map(blog => blog.id === action.payload.id ? action.payload : blog)
        }
    }
})

export const { appendBlogs, setBlogs, appendComment } = blogSlice.actions

export const addComment = (id, commentObj) => {
    return async dispatch => {
        const newObj = await blogService.createComment(id, commentObj)
        dispatch(appendComment(newObj))
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export default blogSlice.reducer