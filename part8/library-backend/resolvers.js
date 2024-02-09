const User = require('./models/user')
const Book = require('./models/book')
const Author = require('./models/author')
const jwt = require('jsonwebtoken')
const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
    Author: {
        bookCount: async (root) => {
            return root.books.length
        },
        books: async (parent) => {
            return await Book.find({ author: parent._id })
        }
    },
    Book: {
        author: async (parent) => {
            try {
                return await Author.findById(parent.author)
            } catch (error) {
                console.error("Error fetching author:", error);
                throw new Error("Failed to fetch author for the book");
            }
        }
    },    
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            if (args.author && !args.genre) return null // Book.find({ author: args.author }).populate('author')
            else if (!args.author && args.genre) return Book.find({ genres: args.genre }).populate('author')
            else if (args.author && args.genre) return null // Book.find({ author: args.author, genre: args.genre }).populate('author')
            else return Book.find({}).populate('author')
        },
        allAuthors: async () => Author.find({}).populate('books'),
        me: (root, args, context) => context.currentUser
    },
    Mutation: {
        addBook: async (root, args, context) => {
            let author = await Author.findOne({ name: args.author })

            if (!author) {
                author = new Author({ name: args.author })
                await author.save()
            }

            const book = new Book({ ...args, author: author._id })

            if (!context.currentUser) {
                throw new GraphQLError('Not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                })
            }

            try {
                await book.save()

                author.books.push(book)
                await author.save()

                pubsub.publish('BOOK_ADDED', { bookAdded: book })
                return book
            }
            catch (error) {
                throw new GraphQLError('Failed to save book', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args,
                        error
                    }
                })
            }
        },
        editAuthor: async (root, args, context) => {
            if (!context.currentUser) {
                throw new GraphQLError('Not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                })
            }

            const author = await Author.findOne({ name: args.name })
            author.born = args.setBornTo
            try {
                author.save()
            } catch (error) {
                throw new GraphQLError('Failed to edit author', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error
                    }
                })
            }
            return author
        },
        createUser: async (root, args) => {
            const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
            return user.save()
                .catch(error => {
                    throw new GraphQLError('Failed to craete user', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args,
                            error
                        }
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'secret') {
                throw new GraphQLError('Wrong credentials', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                })
            }

            const userForToken = {
                username: user.username,
                id: user._id
            }

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
        }
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator('BOOK_ADDED') 
        }
    }
}

module.exports = resolvers