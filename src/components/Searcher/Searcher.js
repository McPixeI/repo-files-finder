import { useCallback, useState } from 'react'
import { getURLdata } from '../../utils/helpers'
import { TextInput } from '../UI/Forms/TextInput'
import { Button } from '../UI/Button'

export const Searcher = ({ setData }) => {
  const [search, setSearch] = useState('')

  const handleSubmit = useCallback((evt) => {
    evt.preventDefault()
    setData(getURLdata(search))
  }, [search, setData])

  return (
    <form onSubmit={handleSubmit} className='mb-10'>
      <div className='flex'>
        <TextInput
          className='mr-1'
          name='searcher'
          value={search}
          onChange={evt => setSearch(evt.target.value)}
        />
        <Button type='submit'>Search</Button>
      </div>

    </form>
  )
}
