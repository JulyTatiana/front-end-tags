import React, { useContext, useState } from 'react'
import { postNote, putNote } from '../../actions/noteActions/noteActions'
import { Store } from '../../state/StoreProvider'

const NoteForm = ({id}) => {

  const {state, dispatch} = useContext(Store)

  const [message, setMessage] = useState('')

  const addingMessage = (e) => {
    setMessage(e.target.value)
  }

  const addNote =async (e) => {
    e.preventDefault()
    if(message){
      const note = {
        message,
        done: false,
        categoryId: id
      }
      const response = await postNote(note)
      const action = {
        type: 'add-note',
        payload: response
      }
      dispatch(action)
      setMessage('')
    }
  }

  const editNote = async (e) => {
    e.preventDefault()
    if(message){
      const noteToUpdate = {...state.note, message: message}
      const response = await putNote(noteToUpdate)
      const action = {
        type: 'update-note',
        payload: response
      }
      dispatch(action)
      setMessage('')
    }
  }

  return (
    <div>
      <form>
        <label htmlFor="note"></label>
        <input onChange={addingMessage} type="text" name="note" value={message} placeholder={id===state.note.categoryId?state.note.message:''}/>
        {id===state.note.categoryId?<button onClick={editNote}>Edit note</button>:<button onClick={addNote}>Add note</button>}
        <br></br>
      </form>
    </div>
  )
}

export default NoteForm
