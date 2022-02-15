import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { UIContext } from 'Contexts/UIContext'
import { useHistory, useLocation } from 'react-router-dom'
import AjaxService from 'Services/ajax-services'

import {
  onRequestConfig,
  onRequestConfigError,
  onResponse,
  onResponseError,
  onNoServerResponse
} from 'Services/network-config'

const UiProvider = ({ children }: any) => {
  const history = useHistory()
  const location = useLocation()

  const [user, setUser] = useState<any>(null)

  const [message, addMessage] = useState({
    text: '',
    type: '',
    variant: 'light',
    show: false
  })

  const service = useMemo(
    () =>
      new AjaxService(
        onRequestConfig,
        onRequestConfigError,
        onResponse,
        onResponseError(history, location),
        onNoServerResponse
      ),
    [history, location]
  )

  const getUserInfo = useCallback(async () => {
    let result = await service?.doAjax('GET', '/authentications/me').catch(() => setUser(null))
    setUser(result?.data.me)
  }, [service])

  useEffect(() => {
    getUserInfo()
  }, [getUserInfo])

  const { Provider } = UIContext
  return (
    <Provider value={{ message, addMessage, service, user }}>
      {children}
    </Provider>
  )
}

export default UiProvider
