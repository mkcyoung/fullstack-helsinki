import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'


const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    console.log(newAnecdote)
    dispatch(createAnecdote(newAnecdote))
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