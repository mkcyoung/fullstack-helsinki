import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'React guy',
    url: 'www.ReactRules.com',
    likes: 1,
    user: 'User1'
  }

  const user = {
    name: 'User1'
  }

  const mockDelete = jest.fn()

  const mockUpdate = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} deleteBlog={mockDelete} updateBlogs={mockUpdate} />
  )

  expect(component.container.querySelector('.defaultInfo')
  ).toBeDefined()

  expect(component.container.querySelector('.moreInfo')
  ).toBe(null)

})