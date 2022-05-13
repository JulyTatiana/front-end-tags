import React, { createContext, useReducer } from 'react'
import reducer from './reducer'

const initialState = {
  categoryList: [],
  category: {
    id: '',
    title: '',
    notes: []
  },
  note: {
    id: '',
    message: '',
    done: false,
    categoryId: '',
    tagList: []
  },
  tag: {
    Id: '',
    name: '',
    noteId: ''
  }
}

const Store = createContext(initialState)

const StoreProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <Store.Provider value={{state, dispatch}}>
      {children}
    </Store.Provider>
  )
}

export default StoreProvider
export {Store, initialState}
