import './App.css'
import Header from './components/header/header'
import Search from './components/search/search'
import Create from './components/create/create'
import NotesList from './components/notesList/notesList'
import { useState } from 'react'
import type { NoteType } from './types/note'
import { NoteEditingActionsContext } from './contexts/noteEditingActions'


function App() {
  type useNotesReturn = {
    notes: NoteType[],
    update: (id:number, changes:NoteType) => void,
    add: (note:NoteType)=>void
  }

  const useNotes = ():useNotesReturn =>  {
    const [notes, setNotes] = useState <NoteType[]>([])
    const add = (note:NoteType) => setNotes(prev => {
      if(note.content.trim()) {
        return [...prev, note]
      }
      return prev
    });
    // const remove = (id) => setNotes(prev => prev.filter(n => n.id !== id));
    const update = (id:number, changes:NoteType) => setNotes(prev => 
      prev.map(n => n.id === id ? {...n, ...changes} : n)
    );
    // const toggle = (id) => setNotes(prev =>
      // prev.map(n => n.id === id ? {...n, done: !n.done} : n)
    // );
    
    return { notes, add, update };
  }
  const {notes, update, add} = useNotes()
  const [isEdit, setIsEdit] = useState<boolean>(false) //isEdit - edit mode state
  const [editingNote, setEditingNote] = useState<NoteType>( // редактируемая
    { 
      id: 0,
      title: 'no',
      content: 'no',
      completed: false
    }
  )
  const [editedNote, setEditedNote] = useState<NoteType>( //отредактированная
    {
      id: -1, 
      title: 'я изменённая заметка по умолчанию',
      content: 'no',
      completed: false
    }
  ) 
  const noteEditingActions = { //только для editButton
    switchEditMode(isEdit:boolean) {
      setIsEdit(isEdit)
    },
    getEditingNote(note:NoteType) {
      setEditingNote(note)
    },
    getEditedNote(note:NoteType) {
      setEditedNote(note)
    },
    update
  }

  return (
  <div>
      {/*если настоящее значение false, то мы показываем. !isEdit даёт true и оно покажется  */}
      {!isEdit && <Header />} 
      {!isEdit && <Search />}
      <NoteEditingActionsContext.Provider value={noteEditingActions}>
        <Create add={add}  isEdit={isEdit} editingNote={editingNote}/>
      </NoteEditingActionsContext.Provider>
      {!isEdit &&
      <NoteEditingActionsContext.Provider value={noteEditingActions}>
        <NotesList notes={notes} isEdit={isEdit}/>
      </NoteEditingActionsContext.Provider>
      }
  </div>
  )
}

export default App
