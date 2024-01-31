const User = ({ user }) => {
    if (!user) return null
    return (
        <div>
            <h2 className="text-xl">{user.name}</h2>
            <br/>
            <h3 className="text-lg">Added blogs:</h3>
            <ul>
                {user.blogs.map(blog => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default User