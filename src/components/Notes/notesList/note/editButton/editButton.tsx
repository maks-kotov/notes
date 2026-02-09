import { useContext } from 'react'
import styles from './editButton.module.css'
import type { NoteType } from '../../../../../types/note'
import { NoteContext } from '../../../../../contexts/noteContext'
interface props {
    isEdit: boolean, //нужно для динамичной отрисовки и вставления текста в textarea
    note: NoteType, 
    id?: number,
    changes?: NoteType
}
function EditButton({note, id, isEdit}:props) {
    const {getCurrentNote, switchEditMode, update} = useContext(NoteContext)!
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
                } className={styles.edit}>
                    <img src="./src/assets/icons/edit.png" alt="icon" />
                </button>
    )
}
export default EditButton
