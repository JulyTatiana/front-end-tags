import { useState } from 'react'
import CategoryList from './components/category/CategoryList'
import StoreProvider from './state/StoreProvider'

function App() {

  return (
    <StoreProvider>
      <CategoryList />
    </StoreProvider>
  )
}

export default App
