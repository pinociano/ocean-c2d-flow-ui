import React from 'react'

import AjaxService from "Services/ajax-services"

const value : Value = {
  message: {
    text: '',
    type: '',
    variant: 'light',
    show: false
  },
  addMessage: (message : Message) => {},
  service : null,
  user: null
}

interface Message {
  text : string
  type: string
  variant: string
  show: boolean
}

interface Value {
  message : Message
  addMessage: (message : Message) => any
  service: AjaxService | null,
  user : any | null
}

const UIContext = React.createContext(value)

export { UIContext }

export default UIContext