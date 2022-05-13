import { useEffect, useReducer, useState } from 'react'
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

  useEffect(() => {
    if (owner && repository) {
      findFilesRecursive(ENDPOINT)
    }
  }, [owner, repository, ENDPOINT])

  let pendingRecursiveCount = 0
  const temp = []

  const findFilesRecursive = async (endpoint) => {
    pendingRecursiveCount = pendingRecursiveCount + 1

    if (pendingRecursiveCount === 1) {
      dispatch({ type: STATUSES.LOADING })
    }

    client(endpoint).then(data => {
      const { tree } = data
      tree.forEach(entry => entry.type === 'tree' &&
      findFilesRecursive(`${owner}/${repository}/git/trees/${entry.sha}`))

      pendingRecursiveCount = pendingRecursiveCount - 1

      const filteredData = tree
        .filter(entry => entry.type !== 'tree')

      temp.push(...filteredData)

      if (pendingRecursiveCount === 0) {
        dispatch({ type: STATUSES.SUCCES, payload: temp })
      }
    }).catch(error => {
      dispatch({ type: STATUSES.ERROR, payload: error.message })
    })
  }

  return state
}
