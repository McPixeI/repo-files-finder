
import { render, screen } from '@testing-library/react'
import { Spinner } from './Spinner'

describe('Spinner', () => {
  it('Spinner | Should render without crashing', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })
})
