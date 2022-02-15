import React, { useState, useEffect, useContext } from 'react'

import { useHistory } from "react-router-dom";
import UIContext from 'Contexts/UIContext'

import LoginForm from 'Components/Login/LoginForm'

function Login() {
  const { service } = useContext(UIContext)

  let history = useHistory();

  const login = async (username: string, password: string) => {    
    let response = await service?.doAjax('POST', '/authentications', { username, password })
    sessionStorage.setItem("token", response?.data.access_token)
    history?.push("/assets")
  }

  return (
    <div id="container">
      <LoginForm onSubmit={login}></LoginForm>
    </div>
  )
}

export { Login }

export default Login
