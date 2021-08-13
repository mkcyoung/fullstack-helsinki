import React from 'react'
import { upVote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()
  
    const vote = (id) => {
      console.log('vote', id)
      dispatch(upVote(id))
      dispatch(setNotification(`voted for "${anecdotes.filter(anecdote => anecdote.id === id)[0].content}"`))
        setTimeout(() => {
            dispatch(removeNotification())},
            5000)
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
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
                </div>
                ).sort((a,b) => b.props.children[1].props.children[1] - a.props.children[1].props.children[1]  )}
        </div>
    )
}

export default AnecdoteList