import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import userService from '../services/users'
import { setUsers } from "../reducers/userReducer"
import { Link } from "react-router-dom"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

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
            <h2 className="text-2xl mb-2">Users</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><span className="font-semibold">User</span></TableCell>
                            <TableCell><span className="font-semibold">blogs created</span></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users && users.map(user => (
                            <TableRow key={user.id}>
                                <TableCell><Link to={`/users/${user.id}`} className="hover:text-sky-600 hover:underline underline-offset-2">{user.username}</Link></TableCell>
                                <TableCell>{user.blogs.length}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Users