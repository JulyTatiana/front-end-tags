import React, { useContext, useState } from 'react'
import { deleteNote, putNote, createTag, deleteTag } from '../../actions/noteActions/noteActions';
import { Store } from '../../state/StoreProvider';

const Note = ({note}) => {

  const {dispatch} = useContext(Store)

  const onCheckbox = async (e)=> {
    const checked = e.currentTarget.checked;
    const noteWithCheckbox = {...note, done: checked}
    const response = await putNote(noteWithCheckbox)
    const action = {
      type: 'update-note',
      payload: response
    }
    dispatch(action)
  }

  const onDeleteNote = async (id) => {
    const response = await deleteNote(id);
    if(response.status === 200){
      const action = {
        type: 'delete-note',
        payload: note
      }
      dispatch(action)
    }
  }

  const editNote = ()=>{
    const action = {
      type: 'add-note-to-be-updated',
      payload: note
    }
    dispatch(action)
  }

  const [tag, setTag] = useState("");
  const onTag = (e) => {
    setTag(e.target.value)
  }

  const addTag = async ()=>{
    const newTag = {
      name: tag,
      noteId: note.id
    }
    
    const response = await createTag(newTag);
    const action = {
      type: 'update-note',
      payload: response
    }
    dispatch(action)
  }

  return (
    <div>
      <h1 style={note.done?{'textDecoration': 'line-through'}:{}}>{note.message}</h1>
      <input onChange={onCheckbox} type="checkbox" checked={note.done} />
      <button onClick={() => onDeleteNote(note.id)}>delete note</button>
      <button onClick={editNote}>edit note</button>
      <br></br>
      <input placeholder='Add tag' onChange={onTag}></input>
      <button onClick={addTag}> add tag</button>
    </div>
  )
}

export default Note
