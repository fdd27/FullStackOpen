import { Link } from "react-router-dom"
import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from '@mui/material'

const Notes = ({ notes }) => (
    <div>
        <h2>Notes</h2>
        
        <TableContainer component={Paper}>
            <Table>
                <TableBody>
                    {notes.map(note => (
                        <TableRow key={note.id}>
                            <TableCell>
                                <Link to={`notes/${note.id}`}>{note.content}</Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
)

export default Notes