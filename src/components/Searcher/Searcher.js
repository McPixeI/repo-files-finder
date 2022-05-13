import { useCallback, useContext, useState } from 'react'
import { getURLdata } from '../../utils/helpers'
import { TextInput } from '../UI/Forms/TextInput'
import { Button } from '../UI/Button'
import { useSearchContext } from '../../context/search-context'
import { STATUSES } from '../../utils/constants/statuses'

export const Searcher = () => {
  const [search, setSearch] = useState('')

  const { searchHandler, status } = useSearchContext()

  const handleSubmit = useCallback((evt) => {
    evt.preventDefault()
    searchHandler(getURLdata(search))
  }, [search, searchHandler])

  return (
    <form onSubmit={handleSubmit} className='mb-10'>
      <div className='flex'>
        <TextInput
          className='mr-1'
          name='searcher'
          value={search}
          onChange={evt => setSearch(evt.target.value)}
        />
        <Button type='submit' disabled={status === STATUSES.LOADING}>Search</Button>
      </div>

    </form>
  )
}
