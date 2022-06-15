import React from "react"

export const useJSX = () => {
  const [state,setState] = React.useState(null)

  const setJsx = (jsx:any) => {
    setState(jsx)
  }

  return [state,setJsx]
}