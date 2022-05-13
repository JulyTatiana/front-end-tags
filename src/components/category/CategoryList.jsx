import React, { useContext, useEffect } from 'react'
import { getAllCategories } from '../../actions/categoryActions/categoryActions'
import { Store } from '../../state/StoreProvider'
import Category from './Category'
import CategoryForm from './CategoryForm'

const CategoryList = () => {

  const {state, dispatch} = useContext(Store)

  useEffect(()=>{
    getAllCategories().then(categories => {
      const action = {
        type: 'get-categories',
        payload: categories
      }
      dispatch(action)
    })
  }, [])

  return (
    <div>
      <h1 style={{display: 'flex',  justifyContent:'center', alignItems:'center', color: 'blue'}}> TO DO LIST WITH CATEGORY OPTION</h1>
      <CategoryForm />
      {state.categoryList.map(category => <Category key={category.id}category={category} />)}
    </div>
  )
}

export default CategoryList
