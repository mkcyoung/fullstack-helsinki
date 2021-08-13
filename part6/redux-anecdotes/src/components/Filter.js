import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const handleChange = (event) => {
        event.preventDefault()
        // input-field value is in variable event.target.value
        const content = event.target.value
        dispatch(setFilter(content))

    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
        filter <input onChange={handleChange} />
        </div>
    )
}

export default Filter