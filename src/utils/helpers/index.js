export const getURLdata = (keyword) => {
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
        return
      }
   
    } catch (error) {
      console.log(error)
    }
}