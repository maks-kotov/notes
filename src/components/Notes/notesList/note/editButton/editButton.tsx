import { useContext } from 'react'
import styles from './editButton.module.css'
import type { NoteType } from '../../../../../types/note'
import { NoteContext } from '../../../../../contexts/noteContext'
import Spinner from '../../../../Auth/spinner/spinner'
interface props {
    isEdit: boolean, //нужно для динамичной отрисовки и вставления текста в textarea
    note: NoteType, 
    id?: number,
    changes?: NoteType
}
function EditButton({note, id, isEdit}:props) {
    const {getCurrentNote, switchEditMode, update, editingLoading} = useContext(NoteContext)!
    return (
                <button onClick={()=>{
                    if (getCurrentNote) {
                        getCurrentNote(note)
                    }
                    if(update && id) {
                        update(id, note)
                    }
                    switchEditMode(!isEdit)
                    }
                } className={styles.edit} disabled={!editingLoading ? false : true}
                style={editingLoading === note.note_id ? {opacity: 0.5} : {opacity: 1}}>
                    {editingLoading === note.note_id ? <Spinner /> 
                    :
                    <img src="./src/assets/icons/edit.png" alt="icon" />}
                </button>
    )
}
export default EditButton

// при клике на edit value textarea должно быть равно тексту из node
// при клике на edit value textarea должно быть равно тексту из node

//можно в app.tsx сделать функцию getText, передать её пропсами до editButton и 

//есть 2 способа: брать текст из массива и брать текст из заметки по конкретному id

// мы должны при клике на editButoon выяснить текст этой заметки по id и передать его в app.tsx