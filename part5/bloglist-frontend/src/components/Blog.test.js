import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('short blog renders title and author but not url and likes', () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'testurl.com',
    likes: 0,
    user: {
      username: 'username',
      name: 'name'
    }
  }

  const handleLike = jest.fn()
  const handleDeleteBlog = jest.fn()

  const { container } = render(<Blog blog={blog} handleLike={handleLike} handleDeleteBlog={handleDeleteBlog} />)

  const shortView = container.querySelector('.short-view')
  const fullView = container.querySelector('.full-view')
  expect(shortView).not.toHaveStyle('display: none')
  expect(fullView).toHaveStyle('display: none')
})

