import { useEffect, useState } from 'react'
import { client } from '../api-client'
import {STATUSES} from '../constants/statuses'


export const useFiles = (data) => {

  const {owner, repository} = data
  const ENDPOINT = `${owner}/${repository}/git/trees/main`
  const [state, setState] = useState({
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

  const findFilesRecursive = async (endpoint) => {
    pendingRecursiveCount = pendingRecursiveCount + 1
    setState(prevState => ({
      ...prevState,
      status: STATUSES.LOADING
    }))
    const data = await client(endpoint).catch(error => {
      setState(prevState => ({
        ...prevState,
        status: STATUSES.ERROR,
        error: error
      }))
    })
    const tree = data?.tree
    tree.forEach(entry => entry.type === 'tree' &&
    findFilesRecursive(`${owner}/${repository}/git/trees/${entry.sha}`))

    pendingRecursiveCount = pendingRecursiveCount - 1

    const filteredData = tree
      .filter(entry => entry.type !== 'tree')

    setState(prevState => ({
      ...prevState,
      files: [...prevState.files, ...filteredData],
      status: pendingRecursiveCount === 0 ? STATUSES.SUCCES : STATUSES.LOADING
    }))
  }

  return state
}