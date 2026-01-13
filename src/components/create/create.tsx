import { useEffect, useState} from 'react'
import styles from './create.module.css'
import EditButton from '../notesList/note/editButton/editButton'
import type { NoteType } from '../../types/note'
interface props {
    pushNote: (node:NoteType) => void,
    isEdit: boolean,
    switchEditMode: (isEdit:boolean)=>void,
    editingNote: NoteType,
    getEditedNote: (note:NoteType)=>void
}
function Create({pushNote, isEdit, switchEditMode, editingNote, getEditedNote} : props) {
    const [note, setNote] = useState<NoteType>({
                            id: 0,
                            title: 'no',
                            content: '',
                            completed: false
                        })
    const [counter, setCounter] = useState<number>(0)
    // console.log(counter);
    
    function changeValue(e:React.ChangeEvent<HTMLTextAreaElement>) {
        setNote({...note, content: e.target.value})
    }
    useEffect(()=>{
        if(isEdit) {
            setNote({...note, content: editingNote.content})
        }
        else {
            setNote({...note, content: ''})
        }
    },[isEdit])
    return (
        <>
            <textarea onChange={changeValue} name="#" className={styles.textarea} placeholder='Создать заметку...' value={note.content}>
                
            </textarea>
            <div className={styles.right}>
                {isEdit === false ? (
                    <button onClick={()=>{
                        pushNote({
                            id: counter,
                            title: 'no',
                            content: note.content,
                            completed: false
                        })
                        setCounter((c)=>++c)
                        setNote({...note, content: ''})
                    }} className={styles.button} type="submit">Добавить</button>
                ) : <EditButton isEdit={isEdit} switchEditMode={switchEditMode} getEditedNote={getEditedNote} note={note}/>}
            </div>
        </>
    )
}
export default Create