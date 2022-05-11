import { forwardRef } from 'react'

export const Button = forwardRef(({ children }, ref) => {
  return (
    <button
      ref={ref}
    >
      {children}
    </button>
  )
})
