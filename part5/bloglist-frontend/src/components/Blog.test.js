import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  const blog = { title: 'test title', author: 'test author', url: 'testurl.com', likes: 0, user: { username: 'username', name: 'name' } }
  const handleLike = jest.fn()
  const handleDeleteBlog = jest.fn()

  beforeEach(() => {
    container = render(<Blog blog={blog} handleLike={handleLike} handleDeleteBlog={handleDeleteBlog} />).container
  })

  test('short blog renders title and author but not url and likes', () => {
    const shortView = container.querySelector('.short-view')
    const fullView = container.querySelector('.full-view')
    expect(shortView).not.toHaveStyle('display: none')
    expect(fullView).toHaveStyle('display: none')
  })

  test('url and likes are shown when full view button is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const url = container.querySelector('.url')
    const likes = screen.getByText('likes', { exact: false })
    expect(url).not.toHaveStyle('display: none')
    expect(likes).not.toHaveStyle('display: none')
  })
})


