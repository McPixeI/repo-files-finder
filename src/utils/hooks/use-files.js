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

  //to know when stops
  let pendingRecursiveCount = 0
  //to avoid using setState and rerendering on every state change
  let temp = [] 

  const findFilesRecursive = async (endpoint) => {
    pendingRecursiveCount = pendingRecursiveCount + 1

    //only set to Loading on first entry
    if (pendingRecursiveCount === 1) {
      setState(prevState => ({
        ...prevState,
        status: STATUSES.LOADING
      }))
    }

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
    
    temp.push(...filteredData)
    //on last entry we change the state avoiding a lot of rerenders
    if (pendingRecursiveCount === 0) {
      setState(prevState => ({
        ...prevState,
        files: temp,
        status: STATUSES.SUCCES 
      }))
    }
    
  }

  return state
}