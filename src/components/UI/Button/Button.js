import clsx from 'clsx'
import PropTypes from 'prop-types'
import { forwardRef } from 'react'
import { Spinner } from '../Spinner'

export const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      type = 'button',
      disabled,
      loading = false,
      className,
      ...rest
    },
    ref
  ) => {
    const classes = clsx(
      'inline-block text-lg rounded-sm focus:outline-none focus:ring focus:ring-opacity-50 disabled:opacity-50',
      'transition duration-300 ease-in-out',
      { 'h-8 px-4': size === 'sm' },
      { 'h-10 px-5': size === 'md' },
      { 'h-12 px-6': size === 'lg' },
      {
        'text-white bg-indigo-500 hover:bg-indigo-600 ring-indigo-200':
          variant === 'primary'
      },
      {
        'text-white bg-gray-700 hover:bg-gray-600 ring-gray-200 dark:bg-white dark:text-gray-600':
          variant === 'secondary'
      },
      className
    )

    return (
      <button
        ref={ref}
        className={classes}
        type={type}
        disabled={disabled || loading}
        {...rest}
      >
        {loading && <Spinner size='sm' align='inline' className='mr-3' />}
        {children}
      </button>
    )
  }
)

Button.propTypes = {
  children: PropTypes.any.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  type: PropTypes.oneOf(['submit', 'button']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  className: PropTypes.string
}
