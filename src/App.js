import { useState } from "react"
import { ExtensionsList } from "./components/ExtensionsList/ExtensionsList"
import { Searcher } from "./components/Searcher"

function App () {

  const [data, setData] = useState({})

  return (
    <div className='App'>
      <h1 className='text-3xl font-bold mb-4'>
        Repo extensions finder
      </h1>
      <Searcher setData={setData}/>
      <ExtensionsList data={data} />
    </div>
  )
}

export default App
