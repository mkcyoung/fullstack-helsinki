import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const titleInput = component.container.querySelector('.Title')
  const authorInput = component.container.querySelector('.Author')
  const urlInput = component.container.querySelector('.Url')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, {
    target: { value: 'testing of forms could be easier' }
  })
  fireEvent.change(authorInput, {
    target: { value: 'ReactGuy' }
  })
  fireEvent.change(urlInput, {
    target: { value: 'www.ReactGuy.com' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing of forms could be easier' )
  expect(createBlog.mock.calls[0][0].author).toBe('ReactGuy' )
  expect(createBlog.mock.calls[0][0].url).toBe('www.ReactGuy.com' )
})


