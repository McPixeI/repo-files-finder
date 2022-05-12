import { useCallback, useState } from 'react'
import { getURLdata } from '../../utils/helpers'
import { TextInput } from '../UI/Forms/TextInput'

export const Searcher = ({ setData }) => {
  const [search, setSearch] = useState('')

  const handleSubmit = useCallback((evt) => {
    evt.preventDefault()
    setData(getURLdata(search))
  }, [search, setData])

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        name='searcher'
        value={search}
        onChange={evt => setSearch(evt.target.value)}
      />
    </form>
  )
}
