import { useContext } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      if (newAnecdote.content.length < 5) throw Error
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueriesData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
    onError: () => {
      dispatch({ type: 'POST_ERROR' })
      setTimeout(() => {
        dispatch({ type: 'REMOVE' })
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    dispatch({ type: 'NEW_ANECDOTE', payload: content })
    setTimeout(() => {
      dispatch({ type: 'REMOVE' })
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
