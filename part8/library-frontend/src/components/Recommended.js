import { ME, ALL_BOOKS } from "../query"
import { useQuery } from '@apollo/client'

const Recommended = ({ show }) => {

    const meResult = useQuery(ME)
    const allBooksResult = useQuery(ALL_BOOKS)

    if (!show) return null
    if (meResult.loading || allBooksResult.loading) return <>loading...</>

    const genre = meResult.data.me.favoriteGenre
    const books = allBooksResult.data.allBooks

    return (
        <div>
            <h2>recommendations</h2>
            <p>books in your favorite genre <span style={{ fontWeight: 600 }}>{genre}</span></p>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {books.filter(book => book.genres.includes(genre)).map((book) => (
                        <tr key={book.title}>
                            <td>{book.title}</td>
                            <td>{book.author.name}</td>
                            <td>{book.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Recommended