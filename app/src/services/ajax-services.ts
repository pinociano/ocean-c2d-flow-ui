/* eslint-disable @typescript-eslint/no-empty-function */

import axios from 'axios'
import { AxiosRequestConfig, AxiosError, AxiosResponse, Method } from 'axios'

type AxiosRequestFunction = (config: AxiosRequestConfig) => void
type AxiosResponseFunction = (response: AxiosResponse) => void
type AxiosErrorFunction = (error: AxiosError) => void

export type ServiceResponse = AxiosResponse

class AjaxService {
  onRequestConfig: AxiosRequestFunction
  onRequestConfigError: AxiosErrorFunction
  onResponse: AxiosResponseFunction
  onResponseError: AxiosErrorFunction
  onNoServerResponse: AxiosErrorFunction

  constructor(
    onRequestConfig: AxiosRequestFunction = () => {},
    onRequestConfigError: AxiosErrorFunction = () => {},
    onResponse: AxiosResponseFunction = () => {},
    onResponseError: AxiosErrorFunction = () => {},
    onNoServerResponse: AxiosErrorFunction = () => {}
  ) {
    this.onRequestConfig = onRequestConfig
    this.onRequestConfigError = onRequestConfigError
    this.onResponse = onResponse
    this.onResponseError = onResponseError
    this.onNoServerResponse = onNoServerResponse
  }

  async doAjax(
    method: Method,
    path: string,
    data?: unknown,
    headers?: Array<any>
  ): Promise<ServiceResponse> {    
    const apiPath = '/api'
    const uri = `${apiPath}${path}`

    let defaultHeaders = {
      'Content-Type': 'application/json',
    }

    headers?.forEach(header => {
      // @ts-ignore
      defaultHeaders[header.name] = header.value
    })

    const config = {
      method: method,
      url: uri,
      data: data,
      headers: defaultHeaders
    }

    this.onRequestConfig(config)
    const request = axios(config)

    try {
      const response = await request
      console.debug(`request ${uri} - config ${JSON.stringify(response)}`)
      this.onResponse(response)
      return Promise.resolve(response)
    } catch (error: any) {
      if (error.response) {
        this.onResponseError(error)
        return Promise.reject(error)
      } else if (error.request) {
        this.onNoServerResponse(error)
        console.debug(
          `no response received ${uri} - error ${JSON.stringify(error.request)}`
        )
        return Promise.reject(error)
      } else {
        this.onRequestConfigError(error)
        console.debug(
          `request config error ${uri} - error ${JSON.stringify(error.message)}`
        )

        console.debug(`request ${uri} - config ${JSON.stringify(error.config)}`)
        return Promise.reject(error)
      }
    }
  }
}

export default AjaxService
