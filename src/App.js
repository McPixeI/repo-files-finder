import { useState } from "react"
import { TextInput } from "./components/UI/Forms/TextInput/TextInput"
import { getURLdata } from "./utils/helpers"

function App () {
  const [search, setSearch] = useState('')
  const [data, setData] = useState({})

  console.log(data)

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setData(getURLdata(search))
  }
  
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
    </div>
  )
}

export default App
