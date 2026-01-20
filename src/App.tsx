import './App.css'
import Header from './components/header/header'
import Search from './components/search/search'
import Create from './components/create/create'
import NotesList from './components/notesList/notesList'
import { useState } from 'react'
import type { NoteType } from './types/note'
import { NoteContext } from './contexts/noteContext'


function App() {
  type useNotesReturn = {
    notes: NoteType[],
    update: (id:number, changes:NoteType) => void,
    add: (note:NoteType)=>void,
    remove: (id:number)=>void,
    toggle: (id:number)=>void,
    sortByNew: ()=>void,
    // filterByNew: ()=>void,
    // filterByAlphabet: ()=>void,
    // filterByCompleteds: ()=>void,
    // filterByUncompleteds: ()=>void,
    // filterByRemoveds: ()=>void,
  }

  const useNotes = ():useNotesReturn =>  {
    //основные методы:
    const [notes, setNotes] = useState <NoteType[]>([])
    const add = (note:NoteType) => setNotes(prev => {
      if(note.content.trim()) {
        return [...prev, note]
      }
      return prev
    });
    const remove = (id:number) => setNotes(prev => prev.filter(n => n.id !== id));
    const update = (id:number, changes:NoteType) => setNotes(prev => 
      prev.map(n => n.id === id ? {...n, ...changes} : n)
    );
    const toggle = (id:number) => setNotes(prev =>
      prev.map(n => n.id === id ? {...n, completed: !n.completed} : n)
    );
    
    //фильтры:
    // const sortByOld = notes.sort((a,b)=>b.createdAt.getTime() - a.createdAt.getTime())
    const sortByNew = () => {
      setNotes([...notes].sort((a,b)=>b.createdAt.getTime() - a.createdAt.getTime()))
    }
    return { notes, add, update, remove, toggle, sortByNew };
  }
  const {notes, update, add, remove, toggle, sortByNew} = useNotes()

  const [isEdit, setIsEdit] = useState<boolean>(false) //isEdit - edit mode state
  const [editingNote, setEditingNote] = useState<NoteType>( // редактируемая
    { 
      id: 0,
      title: 'no',
      content: 'no',
      completed: false,
      createdAt: new Date()
    }
  )
  const noteActions = {
    switchEditMode(isEdit:boolean) {
      setIsEdit(isEdit)
    },
    getEditingNote(note:NoteType) {
      setEditingNote(note)
    },
    update,
    remove,
    toggle,
    sortByNew
  }

  return (
      <NoteContext.Provider value={noteActions}>
        
        {!isEdit && <Header />} 
        {!isEdit && <Search />}
        <Create add={add} isEdit={isEdit} editingNote={editingNote}/>
        {!isEdit &&<NotesList notes={notes} isEdit={isEdit}/>}

      </NoteContext.Provider>
  )
}

export default App
