import { useDispatch, useSelector } from "react-redux"

import { addVote } from "../reducers/anecdoteReducer"
import { setNotification, removeNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({ anecdotes, filter }) => anecdotes.filter(a => a.content.includes(filter)))

    const handleVote = (anecdote) => {
        dispatch(addVote(anecdote))

        dispatch(setNotification(`you voted for ${anecdote.content}`))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList