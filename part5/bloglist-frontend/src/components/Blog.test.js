import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'



describe('<Blog />', () => {
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

  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user} deleteBlog={mockDelete} updateBlogs={mockUpdate} />
    )
  })

  test('renders default content properly', () => {

    expect(component.container.querySelector('.defaultInfo')
    ).toBeDefined()

    expect(component.container.querySelector('.moreInfo')
    ).toBe(null)

  })

  test('shows more blog info when view button is clicked', () => {

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container.querySelector('.defaultInfo')
    ).toBeDefined()

    expect(component.container.querySelector('.moreInfo')
    ).toBeDefined()

  })

  test('clicking like button calls event handler', () => {

    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)
    const likeButton = component.getByText('like')

    for (let i = 0; i < 2; i++){
      fireEvent.click(likeButton)
    }

    expect(mockUpdate.mock.calls).toHaveLength(2)

  })

})
