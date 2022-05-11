import { useEffect, useState } from "react"
import { TextInput } from "./components/UI/Forms/TextInput/TextInput"
import { API_BASE_PATH, TOKEN } from "./utils/constants/api"
import { getURLdata } from "./utils/helpers"

function App () {
  const [search, setSearch] = useState('')
  const [data, setData] = useState({})

  console.log(data)

  useEffect(()=> {
    window.fetch(`${API_BASE_PATH}/${data.owner}/${data.repository}/git/trees/main`,{
      method: 'GET',
      headers: {
        accept: 'application/vnd.github.v3+json',
        authorization: `token ${TOKEN}`
      }
    })
  },[data])

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
