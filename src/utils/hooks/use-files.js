import { useCallback, useEffect, useMemo, useReducer } from 'react'
import { client } from '../api-client'
import { STATUSES } from '../constants/statuses'
import { filesReducer } from '../reducers/files-reducer'

const initialState = {
  files: [],
  status: STATUSES.IDLE,
  error: null
}

export const useFiles = (data) => {
  const { owner, repository } = data

  const [state, dispatch] = useReducer(filesReducer, initialState)

  let pendingRecursiveCount = 0
  const temp = useMemo(() => [], [])

  const findDefaultBranch = useCallback(async (url) => {
    dispatch({ type: STATUSES.LOADING })
    return await client(`${owner}/${repository}`)
      .then(data => data.default_branch)
      .catch(error => {
        dispatch({ type: STATUSES.ERROR, payload: error.message })
      })
  }, [owner, repository])

  const findFilesRecursive = useCallback(async (endpoint) => {
    pendingRecursiveCount++

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
    findDefaultBranch().then(branch => {
      findFilesRecursive(`${data.owner}/${data.repository}/git/trees/${branch}`)
    }).catch(err => console.log(err))
  }, [data, findFilesRecursive, findDefaultBranch])

  return state
}
