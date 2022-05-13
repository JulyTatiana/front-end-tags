import React, { useContext } from 'react'
import { deleteCategoryBack } from '../../actions/categoryActions/categoryActions';
import { Store } from '../../state/StoreProvider';
import NoteList from '../note/NoteList'

const Category = ({category: {id, title, notes}}) => {

  const {dispatch} = useContext(Store)

  const deleteCategory = async (id)=>{
    const response = await deleteCategoryBack(id)
    if(response.status === 200){
      const action = {
        type: 'deleteCategory',
        payload: id
      }
      dispatch(action)
    }
  }

  return (
    <div>
      <h2>{title}</h2>
      <button onClick={() => deleteCategory(id)}>Delete category</button>
      <NoteList id={id} notes={notes}/>
    </div>
  )
}

export default Category
