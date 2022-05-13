import { useId } from 'react'
import { getExtension } from '../../utils/helpers'
import { useFiles } from '../../utils/hooks/use-files'
import { Spinner } from '../UI/Spinner'

export const ExtensionsList = ({ data }) => {
  const { files, status, error } = useFiles(data)

  const paths = files.map(file => getExtension(file.path))

  const extensions = paths.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1
    return acc
  }, {})

  if (status === 'loading') return <Spinner />

  if (status === 'error') return <p>Error: {error}</p>

  return (
    <>

      {Object.keys(extensions).length
        ? (Object.keys(extensions).map(ext => {
            return <p key={useId}><strong>{`${ext}: `}</strong>{extensions[ext]}</p>
          }))
        : null}
    </>
  )
}
