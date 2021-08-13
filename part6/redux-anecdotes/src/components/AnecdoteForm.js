import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(setNotification('successfully created anecdote'))
    setTimeout(() => {
        dispatch(removeNotification())},
        5000)
  }

  return (
    <>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
        </form>
    </>
  )
}

export default AnecdoteForm