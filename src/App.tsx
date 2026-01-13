import './App.css'
import Header from './components/header/header'
import Search from './components/search/search'
import Create from './components/create/create'
import NodesList from './components/notesList/notesList'
import { useState } from 'react'
import type { NoteType } from './types/note'
// import C1 from './components/c1/c1'
function App() {
  // пускай мы что-то набираем, потоом оно передаётся в родителя, потом в nodesList, а потом в node
  // type Note = {
  //   id: number,
  //   title: string,
  //   content: string,
  //   completed: boolean
  // }; НАДО СДЕЛАТЬ ЧТОБЫ ТИП ИМПОРТИРОВАЛСЯ
  const [noteArr, setNoteArr] = useState <NoteType[]>([]) 
  const [isEdit, setIsEdit] = useState<boolean>(false) //isEdit - edit mode state
  const [editingNote, setEditingNote] = useState<NoteType>({
    id: 0,
    title: 'no',
    content: 'no',
    completed: false
})
  const [editedNote, setEditedNote] = useState<NoteType>({id: -1,
    title: 'я изменённая заметка по умолчанию',
    content: 'no',
    completed: false})
  function pushNote(note:NoteType):void {
    //теперь каждая заметка это не текст в массиве, а объект у которого будет свой id для того чтобы я мог при редактировании смотреть какую заметку мы меняем
    if(note.content.trim()) {
      setNoteArr((prevArr:NoteType[])=>[...prevArr, note])
    }
  }  
  function switchEditMode(isEdit:boolean) {
    setIsEdit(isEdit)
  } 
  function getCurrentNote(note:NoteType) { // получить текущую редактируемую заметку и вставить её текст в textarea (когда мы нажимаем на editedButton чтоб в textarea был текст последней заметки)
    setEditingNote(note)
    // console.log('текущая заметка: ', note);
  }
  function getEditedNote(note:NoteType) { // получить отредактированную заметку из textarea
    setEditedNote(note)
    // console.log('текущая изменённая заметка: ',  note);
    
  }
  return (
  <div>
      {!isEdit && <Header />} {/*если настоящее значение false, то мы показываем. !editNodeIsClicked даёт true и оно покажется  */}
      {!isEdit && <Search />}
       <Create pushNote={pushNote} switchEditMode={switchEditMode} isEdit={isEdit} editingNote={editingNote} getEditedNote={getEditedNote}/> {/*редактируемый текст приходит из node, вставляется в textarea, затем мы отслеживаем что мы наизменяли в textarea и отправляем изменённый назад */}
      {!isEdit &&
      <NodesList noteArr={noteArr} switchEditMode={switchEditMode} isEdit={isEdit} getCurrentNote={getCurrentNote} editedNote={editedNote}/>
      }
  </div>
  )
}

export default App
