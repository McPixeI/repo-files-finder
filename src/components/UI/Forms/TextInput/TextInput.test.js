
import React, { useState } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { TextInput } from './TextInput'
import userEvent from '@testing-library/user-event'

function InputMock ({ props }) {
  const [value, setValue] = useState('')
  return (
    <TextInput
      data-testid='testInput'
      name='testInput'
      value={value}
      onChange={e => setValue(e.target.value)}
      {...props}
    />
  )
}

const setup = () => {
  const utils = render(<InputMock />)
  const input = screen.getByTestId('testInput')
  return {
    input,
    ...utils
  }
}

describe('TextInput', () => {
  it('TextInput | Should render without errors', () => {
    render(<InputMock />)
    expect(screen.getByTestId('testInput')
    ).toBeVisible()
  })

  it('TextInput | Should update input text on user type', async () => {
    const { input } = setup()
    expect(input.value).toBe('')
    userEvent.type(input, 'some text')
    await waitFor(() => {
      expect(input.value).toBe('some text')
    })
  })
})