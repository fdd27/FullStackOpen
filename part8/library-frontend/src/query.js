import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
        title
        published
        genres
        id
        author {
            name
            born
            id
            bookCount
        }
    }
`
export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`
export const ALL_BOOKS = gql`
    query {
        allBooks {
            title
            author {
                name
            }
            published
            genres
        }
    }
`
export const GET_BOOKS_BY_GENRE = gql`
    query GetBooksByGenre($genre: String!) {
        allBooks(genre: $genre) {
            title
            author {
                name
            }
            published
            genres
        }
    }
`
export const ME = gql`
    query {
        me {
            username
            favoriteGenre
        }
    }
`
export const CREATE_BOOK = gql`
    mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook(
            title: $title,
            author: $author,
            published: $published,
            genres: $genres
        ) {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`
export const EDIT_BORN = gql`
    mutation editBorn($name: String!, $born: Int!) {
        editAuthor(
            name: $name,
            setBornTo: $born
        ) {
            name
            born
            id
        }
    }
`
export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(
            username: $username,
            password: $password
        ) {
            value
        }
    }
`
export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`