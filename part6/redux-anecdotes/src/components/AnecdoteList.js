import React from 'react'
import { upVote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const anecdotes = useSelector(({ filter, anecdotes }) => {
       return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
    })
    const dispatch = useDispatch()
  
    const vote = (anecdote) => {
    //   console.log('vote', id)
      dispatch(upVote(anecdote))
      
      dispatch(setNotification(`voted for "${anecdote.content}"`))
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
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
                </div>
                ).sort((a,b) => b.props.children[1].props.children[1] - a.props.children[1].props.children[1]  )}
        </div>
    )
}

export default AnecdoteList