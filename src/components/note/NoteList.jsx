import React, { useContext } from 'react'
import Note from './Note'
import NoteForm from './NoteForm'
import TagList from '../tag/TagList'
import { deleteTag } from '../../actions/noteActions/noteActions'
import { Store } from '../../state/StoreProvider';


const NoteList = ({ notes, id }) => {

  const {dispatch} = useContext(Store)

  const onDeleteTag = async (tag) => {
    const response = await deleteTag(tag.id);
    if(response.status === 200){
      const action = {
        type: 'delete-tag',
        payload: tag
      }
      dispatch(action)
    }
  }

  return (
    <div>
      <NoteForm id={id} />
      {notes.map(note =>
        <div key = {note.id}>
          <Note key={note.id} note={note}></Note>
          {
            note.tagList.map(tag => {
              return <div>
                {tag.name}
                <button onClick={()=>onDeleteTag(tag)}>
                  Delete Tag
                </button>
              </div>
            })
          }
        </div>)}
    </div>
  )
}

export default NoteList
