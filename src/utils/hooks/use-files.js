import { useCallback, useEffect, useMemo, useReducer } from 'react'
import { client } from '../api-client'
import { STATUSES } from '../constants/statuses'
import { filesReducer } from '../reducers/files-reducer'

export const useFiles = (data) => {
  const { owner, repository } = data
  const ENDPOINT = `${data?.owner}/${data?.repository}/git/trees/main`

  const [state, dispatch] = useReducer(filesReducer, {
    files: [],
    status: STATUSES.IDLE,
    error: null
  })

  let pendingRecursiveCount = 0
  const temp = useMemo(() => [], [])

  const findFilesRecursive = useCallback(async (endpoint) => {
    pendingRecursiveCount++

    pendingRecursiveCount === 1 && dispatch({ type: STATUSES.LOADING })

    client(endpoint).then(data => {
      const { tree } = data
      tree.forEach(entry => entry.type === 'tree' &&
      findFilesRecursive(`${owner}/${repository}/git/trees/${entry.sha}`))

      --pendingRecursiveCount

      const filteredData = tree
        .filter(entry => entry.type !== 'tree')

      temp.push(...filteredData)

      pendingRecursiveCount === 0 && dispatch({ type: STATUSES.SUCCES, payload: temp })
    }).catch(error => {
      dispatch({ type: STATUSES.ERROR, payload: error.message })
    })
  }, [owner, repository, pendingRecursiveCount, temp])

  useEffect(() => {
    if (!Object.keys(data).length) return
    findFilesRecursive(ENDPOINT)
  }, [data, findFilesRecursive, ENDPOINT])

  return state
}
