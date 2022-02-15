import { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import { History } from 'history'

export const onRequestConfig = (config: AxiosRequestConfig): void => {
  const token = sessionStorage.getItem('token')
  //@ts-ignore
  if (token) config.headers["Authorization"] = `Bearer ${token}`
}

export const onRequestConfigError = (error: AxiosError): void => {
  console.log(error)
}

export const onNoServerResponse = (error: AxiosError): void => {
  console.log(error)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const onResponse = (response: AxiosResponse): void => {
  // This is an empty function.
}

export const onResponseError = (history: History, location: any) => (error: AxiosError): void => {
  console.log(error)
  const currentPath = location.pathname;
  switch (error?.response?.status) {
    case 401:
      if(currentPath !== "/login") history?.push('/login')
      break
  }
}
