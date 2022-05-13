import React, { useContext, useState } from 'react'
import Note from './Note'
import NoteForm from './NoteForm'
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
        if (filter == "") {
          return filterNote;
        } else if (filterNote.tagList.length > 0) {
          const tagsFromNote = filterNote.tagList;
          // console.log("Tags: ");
          // console.log(tagsFromNote);
          const containsTag = tagsFromNote.filter((tag) => {return tag.name.toLowerCase().includes(filter.toLowerCase())});
          // console.log("Tags que coinciden: ");
          // console.log(containsTag);
          
          // console.log("Tamaño de containsTag: ");
          // console.log(containsTag.length);
          if (containsTag.length > 0){
            return filterNote;
          }
        }
        return false;
      }
      ).map(note =>
        <div key={note.id}>
          <Note note={note} />
          {
            note.tagList.map(tag => {
              return <div key={tag.id}>
                <h3>{tag.name}
                <button onClick={() => onDeleteTag(tag)}>Delete Tag</button>
                </h3>
              </div>
            })
          }
        </div>)}
    </div>
  )
}

export default NoteList
