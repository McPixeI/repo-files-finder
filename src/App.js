import { useCallback, useState } from "react"
import { ExtensionsList } from "./components/ExtensionsList/ExtensionsList"
import { TextInput } from "./components/UI/Forms/TextInput/TextInput"
import { getURLdata } from "./utils/helpers"

function App () {
  const [search, setSearch] = useState('')
  const [data, setData] = useState({})

  const handleSubmit = useCallback((evt) => {
    evt.preventDefault()
    setData(getURLdata(search))
  },[search])
  
  return (
    <div className='App'>
      <h1 className='text-3xl font-bold mb-4'>
        Repo extensions finder
      </h1>
      <form onSubmit={handleSubmit}>
        <TextInput 
          name='searcher'
          value={search} 
          onChange={evt => setSearch(evt.target.value)}
        />
      </form>
      <ExtensionsList data={data} />
    </div>
  )
}

export default App
