import clsx from 'clsx'
import PropTypes from 'prop-types'
import { forwardRef } from 'react'

export const TextInput = forwardRef(
  ({
    field,
    label,
    name,
    value,
    type = 'text',
    placeholder,
    size = 'md',
    disabled = false,
    required = false,
    error = '',
    className,
    form: { touched, errors },
    ...props
  }, ref) => {
    const classes = clsx(
      'outline-none p-4 w-full text-gray-900 bg-gray-50 border border-gray-300 sm:text-md disabled:cursor-not-allowed focus:ring-indigo-500 focus:border-indigo-500',
      'transition duration-300 ease-in-out',
      { 'h-8 px-4': size === 'sm' },
      { 'h-10 px-5': size === 'md' },
      { 'h-12 px-6': size === 'lg' },
      {
        'border-red-500 text-red-900 focus:ring-red-500 focus:border-red-500': errors[field.name]
      },
      className
    )

    return (
      <div className='w-full'>
        {label && (
          <label
            htmlFor={name}
            className='block mb-2 text-sm font-medium text-gray-900'
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
          ref={ref}
          {...field}
          {...props}
        />
        {
          touched[field.name] && errors[field.name] &&
            <p className='text-sm text-red-600'>{errors[field.name]}</p>
        }
      </div>
    )
  }
)

TextInput.propTypes = {
  name: PropTypes.string,
  type: PropTypes.oneOf(['text', 'password', 'email', 'search']),
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  value: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string
}
