import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Button } from './Button'

const mockFn = jest.fn()

describe('Button', () => {
  it('Button | Should render without errors', () => {
    render(<Button>hello</Button>)
    expect(screen.getByRole('button', { name: /hello/i })
    ).toBeVisible()
  })

  it('Button | Should fires click event properly', async () => {
    render(<Button onClick={mockFn}>hello</Button>)
    const btn = screen.getByRole('button', { name: /hello/i })
    fireEvent.click(btn)
    await waitFor(() => expect(mockFn).toHaveBeenCalled())
  })

  it('Button | Should be disabled when loading state', () => {
    render(<Button loading>hello</Button>)
    const btn = screen.getByRole('button', { name: /hello/i })
    expect(btn).toBeDisabled()
  })

  it('Button | Should be disabled when disabled state', () => {
    render(<Button disabled>hello</Button>)
    const btn = screen.getByRole('button', { name: /hello/i })
    expect(btn).toBeDisabled()
  })
})
