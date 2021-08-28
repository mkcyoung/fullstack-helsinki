import React, { useState, useEffect } from 'react'
import { useApolloClient, useQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'
import { GET_USER } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const user = useQuery(GET_USER)

  useEffect(() => {
    const loggedIn = localStorage.getItem('library-user-token')
    if (loggedIn){
      setToken(loggedIn)
    }
  }, [])

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  if(user.loading){
    return <div>loading...</div>
  }

  if (!token) {
    return (
        <div>
          <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>

        <Notification message={errorMessage} />

        <Authors
        show={page === 'authors'}
        />

        <Books
          show={page === 'books'}
        />

        <LoginForm
          show={page === 'login'}
          setToken={setToken}
          setError={notify}
          setPage={setPage}
        />

      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommended</button>
        <button onClick={() => logout()}>logout</button>
      </div>

      <Notification message={errorMessage} />

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <Recommended
        show={page ==='recommend'}
        userGenre={user.data.me.favoriteGenre}
      />

      <NewBook
        show={page === 'add'}
        setError={notify}
      />

    </div>
  )
}

export default App