import { createContext, useContext, useState } from 'react'
import { useFiles } from '../utils/hooks/use-files'

export const SearchContext = createContext({
  query: '',
  searchHandler: () => {}
})
SearchContext.displayName = 'SearchContext'

const SearchProvider = ({ children }) => {
  const [data, setData] = useState([])

  const searchHandler = data => setData(data)

  const { files, status, error } = useFiles(data)

  return (
    <SearchContext.Provider value={{
      searchHandler,
      files,
      status,
      error
    }}
    >
      {children}
    </SearchContext.Provider>
  )
}

const useSearchContext = () => {
  const state = useContext(SearchContext)
  return state
}

export { SearchProvider, useSearchContext }
