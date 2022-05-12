import clsx from 'clsx'
import PropTypes from 'prop-types'
import { forwardRef } from 'react'

export const TextInput = forwardRef(
  ({
    name,
    type = 'text',
    placeholder,
    size = 'md',
    label,
    value = '',
    disabled = false,
    error = '',
    required = false,
    className,
    onChange = () => {},
    ...rest
  }, ref) => {
    const classes = clsx(
      'outline-none p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md disabled:cursor-not-allowed focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500',
      'transition duration-300 ease-in-out',
      { 'h-8 px-4': size === 'sm' },
      { 'h-10 px-5': size === 'md' },
      { 'h-12 px-6': size === 'lg' },
      {
        'border-red-500 text-red-900 dark:border-red-500 dark:text-red-900 focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500': error
      },
      className
    )

    return (
      <>
        {label && (
          <label
            htmlFor={name}
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            {label}
          </label>
        )}
        <input
          className={classes}
          type={type}
          id={name}
          placeholder={placeholder}
          size={size}
          name={name}
          value={value}
          disabled={disabled}
          onChange={onChange}
          ref={ref}
          {...rest}
        />
        {error && <p class='text-sm text-red-600 dark:text-red-500'>{error}</p>}
      </>
    )
  }
)

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'password', 'email', 'search']), // For now only this types are OK
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  value: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired
}
