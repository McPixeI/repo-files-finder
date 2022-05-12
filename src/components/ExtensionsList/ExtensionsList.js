import { getExtension } from "../../utils/helpers"
import { useFiles } from "../../utils/hooks/use-files"
import {Spinner} from '../UI/Spinner'

export const ExtensionsList = ({data}) => {
    
    const { files, status, error } = useFiles(data)
    const extensions = files.map(file => getExtension(file.path))
    const extensionsCount = extensions.reduce((total, value) => {
        total[value] = (total[value] || 0) + 1
        return total
    }, {})

    console.log(extensionsCount)

  if (status === 'loading') return <Spinner/>

  if (status === 'error') return <p>Error: {error}</p>

  return (
    <>
      {files.length ? files.map(file => <p key={file.sha}>{file.path}</p>) : null}
    </>
  )
}