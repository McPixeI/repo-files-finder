import { useSearchContext } from '../../context/search-context'
import { getExtension } from '../../utils/helpers'
import { Spinner } from '../UI/Spinner'

export const ExtensionsList = () => {
  const { files, status, error } = useSearchContext()

  const paths = files.map(file => getExtension(file.path))

  const extensions = paths.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1
    return acc
  }, {})

  if (status === 'loading') return <Spinner />

  // ToDo: mostrar toast o algo asi?
  if (status === 'error') return <p>Error: {error}</p>

  return (
    <>
      {Object.keys(extensions).length
        ? (Object.keys(extensions).map(ext => {
            return <p key={ext}><strong>{`${ext}: `}</strong>{extensions[ext]}</p>
          }))
        : null}
    </>
  )
}
