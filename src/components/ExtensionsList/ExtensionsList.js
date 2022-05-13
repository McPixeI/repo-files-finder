import { useState } from 'react'
import { useSearchContext } from '../../context/search-context'
import { getExtension } from '../../utils/helpers'
import { Filter } from '../Filter/Filter'
import { Spinner } from '../UI/Spinner'

export const ExtensionsList = () => {
  const { files, status, error } = useSearchContext()
  const [keyword, setKeyword] = useState('')

  const paths = files.map(file => getExtension(file.path))

  const extensions = paths.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1
    return acc
  }, {})

  if (status === 'loading') return <Spinner />

  if (status === 'error') return <p className='text-red-500'>Error: {error}</p>

  const handleChange = (evt) => {
    setKeyword(evt.target.value)
  }

  /* eslint-disable react/jsx-closing-tag-location */
  return (
    <>
      {Object.keys(extensions).length
        ? <div className='block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md'>
          <h2 className='text-2xl font-bold mb-7'>Resultados:</h2>
          <Filter handleChange={handleChange} />
          <ul>
            {(Object.keys(extensions)
              .filter(ext => ext.toLowerCase().match(keyword.toLowerCase()))
              .map(ext => {
                return (
                  <li className='flex justify-between mb-1 pb-1 border-b-slate-200 border-b-2 last:border-0' key={ext}>
                    <strong>{`${ext}: `}</strong>
                    <span>{extensions[ext]}</span>
                  </li>
                )
              }))}
          </ul>
        </div>
        : null}
    </>
  )
}
