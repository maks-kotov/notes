import { useContext } from 'react'
import type { NoteType } from '../../../types/note'
import EditButton from './editButton/editButton'
import styles from './note.module.css'
import { NoteContext } from '../../../contexts/noteContext'
interface props {
    note: NoteType,
    isEdit: boolean,
}

function Note({note, isEdit}:props) {
    const {remove} = useContext(NoteContext)!
    return (
        <>
            <div className={styles.container}>
                <div className={styles.text}>{note.content}</div>
                <button className={styles.made}>✔</button>
                <button onClick={
                    ()=>{
                        remove(note.id)
                    }
                } className={styles.delete}>✗</button>
                <EditButton isEdit={isEdit} note={note}/>
            </div>
        </>
    )
}
export default Note