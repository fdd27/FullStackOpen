import { useDispatch } from "react-redux";
import { addComment } from "../reducers/blogReducer";
import { List, ListItem, ListItemText, Divider, Button, TextField } from '@mui/material'

const BlogPage = ({ blog, handleLike, handleDelete }) => {
    const dispatch = useDispatch()

    const user = JSON.parse(localStorage.getItem("loggedBlogUser")) || {
        username: "username",
        name: "name",
    };

    const addLike = () => {
        handleLike({
            id: blog.id,
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1,
            user: blog.user,
        });
    }

    const deleteBlog = () => {
        handleDelete(blog);
    }

    const appendComment = () => {
        const commentObj = { comment: document.getElementById('txtComment').value }
        dispatch(addComment(blog.id, commentObj))
    }

    if (!blog) return null
    return (
        <div>
            <h2 className="text-xl">Title: {blog.title}</h2>

            <a href={blog.url}>URL: <span className="hover:text-sky-500 hover:underline underline-offset-2">{blog.url}</span></a>
            <div>{blog.likes} likes <Button className='max-h-6' variant="contained" onClick={addLike}>like</Button> </div>
            <div>added by {blog.author}</div>
            {blog.user.username === user.username && (
                <button id='btnDelete' onClick={deleteBlog}>delete</button>
            )}

            <h3 className='mt-4 mb-1'>comments:</h3>
            <List className=" w-full max-w-80 border rounded-lg">
                {blog.comments.map(c => (
                    <div key={c._id}>
                        <ListItem>
                            <ListItemText>{c.comment}</ListItemText>
                        </ListItem>
                        <Divider component="li" />
                    </div>
                )
                )}
            </List>
            <div className='mt-4 flex flex-row gap-x-8'>
                <TextField id="txtComment" label='Comment' variant="outlined" />
                <Button variant="contained" onClick={appendComment}>add</Button>
            </div>
        </div>
    )
}

export default BlogPage