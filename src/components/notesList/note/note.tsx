import type { NoteType } from '../../../types/note'
import EditButton from './editButton/editButton'
import styles from './note.module.css'
interface props {
    note: NoteType,
    switchEditMode: (isEdit:boolean)=>void,
    isEdit: boolean,
    id: number,
    getEditingNote: (note:NoteType)=>void
}
function Note({note, switchEditMode, isEdit, id, getEditingNote}:props) {
    return (
        <>
            <div className={styles.container} data-node-id={id}>
                <div className={styles.text}>{note.content}</div>
                <button className={styles.made}>✔</button>
                <button className={styles.delete}>✗</button>
                <EditButton isEdit={isEdit} switchEditMode={switchEditMode} note={note} getEditingNote={getEditingNote}/>
            </div>
        </>
    )
}
export default Note