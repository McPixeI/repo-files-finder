export function getURLdata (keyword) {
  try {
    const url = new window.URL(keyword)
    const pathArr = url.pathname.split('/').filter(Boolean)
    return {
      owner: pathArr[0],
      repository: pathArr[1]
    }
  } catch (error) {
    console.log(error)
  }
}

export function getExtension (filename) {
  return filename.split('.').pop()
}
