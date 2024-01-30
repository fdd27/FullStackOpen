import { useDispatch } from "react-redux";
import { addComment } from "../reducers/blogReducer";

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
            <h2>{blog.title}</h2>

            <a href={blog.url}>{blog.url}</a>
            <div>{blog.likes} likes <button onClick={addLike}>like</button> </div>
            <div>added by {blog.author}</div>
            {blog.user.username === user.username && (
                <button id='btnDelete' onClick={deleteBlog}>delete</button>
            )}

            <h3>comments</h3>
            <ul>
                {blog.comments.map(c => (
                        <li key={c._id}>{c.comment}</li>
                    )
                )}
            </ul>
            <div>
                <input type="text" id="txtComment" />
                <button onClick={appendComment}>add</button>
            </div>
        </div>
    )
}

export default BlogPage