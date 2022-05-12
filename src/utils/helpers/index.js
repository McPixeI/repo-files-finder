export function getURLdata (keyword) {
    if (typeof keyword !== 'string' || !keyword.length) {
      return null;
    }
    try {
      const url = new window.URL(keyword)
      if (url.hostname === 'github.com') {
        const pathArr = url.pathname.split("/").filter(Boolean);
        return {
          owner: pathArr[0],
          repository: pathArr[1]
        }
      } else {
        //To Do
        return null
      }
   
    } catch (error) {
      console.log(error)
    }
}

export function getExtension (filename) {
  return filename.split('.').pop()
}