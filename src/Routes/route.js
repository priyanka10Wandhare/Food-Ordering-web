import React, { useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"

const Authmiddleware = props => {
  const navigate = useNavigate()


  if (!localStorage.getItem("authUser")) {
    return (
      <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
    )
  }
  return <React.Fragment>{props.children}</React.Fragment>
}

export default Authmiddleware