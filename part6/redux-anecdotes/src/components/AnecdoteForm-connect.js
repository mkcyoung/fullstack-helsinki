import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'



const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)

    props.setNotification('successfully created anecdote',5)
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

const mapStateToProps = (state) => {
  return {
    message: state.notification.message
  }
}

const mapDispatchToProps = {
  createAnecdote,
  setNotification
}

const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm