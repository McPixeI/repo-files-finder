import { forwardRef } from 'react'

export const TextInput = forwardRef(
  ({
    name,
    type = 'text',
    onChange = () => {},
    ...rest
  }, ref) => {
    return (
      <>
        <input
          ref={ref}
          type={type}
          id={name}
          name={name}
          onChange={onChange}
          {...rest}
        />
      </>
    )
  })
