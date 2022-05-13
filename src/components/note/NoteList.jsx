import React, { useContext, useState } from 'react'
import Note from './Note'
import NoteForm from './NoteForm'
import TagList from '../tag/TagList'
import { deleteTag } from '../../actions/noteActions/noteActions'
import { Store } from '../../state/StoreProvider';


const NoteList = ({ notes, id }) => {

  const { dispatch } = useContext(Store)

  const onDeleteTag = async (tag) => {
    const response = await deleteTag(tag.id);
    if (response.status === 200) {
      const action = {
        type: 'delete-tag',
        payload: tag
      }
      dispatch(action)
    }
  }

  const onFilter = (e) => {
    setFilter(e.target.value)
  }

  const [filter, setFilter] = useState("")

  return (
    <div>
      <NoteForm id={id} />
      <input placeholder='filter notes by tags' onChange={onFilter} type="text" value={filter} />

      {notes.filter(filterNote => {
        return true
      }
        // if (filter == "") {
        //   return filterNote
        // }
        // else if (filterNote.tagList.length > 0) {
        //   filterNote.tagList.forEach((tag) => {
        //     if (tag.name.toLowerCase().includes(filter.toLowerCase())) {
        //       return filterNote
        //     }
        //   })
        // }
        // }
      ).map(note =>
        <div key={note.id}>
          <Note key={note.id} note={note}></Note>
          {
            note.tagList.map(tag => {
              return <div>
                {tag.name}
                <button onClick={() => onDeleteTag(tag)}>
                  Delete Tag
                </button>
              </div>
            })
          }
        </div>)}

      {/* {notes.map(note =>
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
        </div>)} */}

    </div>
  )
}

export default NoteList
