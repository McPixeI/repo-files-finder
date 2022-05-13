import { TextInput } from '../UI/Forms/TextInput/TextInput'

export const Filter = ({ handleChange }) => {
  return (
    <TextInput
      className='w-full mb-6'
      size='sm'
      label='Filtrar por'
      onChange={handleChange}
    />
  )
}
