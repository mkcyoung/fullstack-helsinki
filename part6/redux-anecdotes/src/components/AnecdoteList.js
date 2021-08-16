import React from 'react'
import { upVote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const anecdotes = useSelector(({ filter, anecdotes }) => {
       return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
    })
    const message = useSelector( state => state.notification.message )
    const timeoutID = useSelector( state => state.notification.timeoutID )

    const dispatch = useDispatch()
  
    const vote = (anecdote) => {
        dispatch(upVote(anecdote))
        if (message) {
            clearTimeout(timeoutID)
            dispatch(setNotification(`voted for "${anecdote.content}"`, 5))
        } else {
            dispatch(setNotification(`voted for "${anecdote.content}"`, 5))
        }
    }

    // Sorted handled clumsily here, in model solution they handled sorting in the reducer,
    // so that the anecdoates recieved here were already sorted

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