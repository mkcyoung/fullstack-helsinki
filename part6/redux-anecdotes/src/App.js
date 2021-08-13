import React, {useEffect} from 'react'
// import AnecdoteForm from './components/AnecdoteForm'
import ConnectedAnecdoteForm from './components/AnecdoteForm-connect'
import AnecdoteList from './components/AnecdoteList'
// import Notification from './components/Notification'
import ConnectedNotification from './components/Notification-connect'
// import Filter from './components/Filter'
import ConnectedFilter from './components/Filter-connect'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      {/* <Notification /> */}
      <ConnectedNotification />
      {/* <Filter /> */}
      <ConnectedFilter />
      <AnecdoteList />
      {/* <AnecdoteForm /> */}
      <ConnectedAnecdoteForm />
    </div>
  )
}

export default App