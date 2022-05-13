import { ExtensionsList } from './components/ExtensionsList/ExtensionsList'
import { Searcher } from './components/Searcher'

function App () {
  return (
    <div className='flex justify-center mt-20 px-4'>
      <div className='w-full max-w-3xl'>
        <h1 className='text-3xl font-bold mb-10 text-center'>
          Repo extensions finder
        </h1>
        <Searcher />
        <ExtensionsList />
      </div>
    </div>
  )
}

export default App
