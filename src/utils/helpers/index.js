import { REPO_REGEX_VALIDATOR } from '../constants/regex'

export function extractRepoDataFromURL (keyword) {
  if (!keyword) return null
  const match = keyword.match(REPO_REGEX_VALIDATOR)
  if (!match || !(match.groups?.owner && match.groups?.repository)) return null
  return match.groups
}

export function getExtension (filename) {
  return filename.split('.').pop()
}
