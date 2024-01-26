import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import userService from '../services/users'
import { setUsers } from "../reducers/userReducer"
import { Link } from "react-router-dom"

const Users = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        userService
            .getAll()
            .then(users => dispatch(setUsers(users)))
    }, [])

    const users = useSelector(state => state.users)

    return (
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user => (
                        <tr key={user.id}>
                            <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Users