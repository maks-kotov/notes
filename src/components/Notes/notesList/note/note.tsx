import { useContext } from 'react'
import EditButton from './editButton/editButton'
import styles from './note.module.css'
import type { NoteType } from '../../../../types/note'
import { NoteContext } from '../../../../contexts/noteContext'
import Spinner from '../../../Auth/spinner/spinner'
interface props {
    note: NoteType,
    isEdit: boolean,
    isView: boolean
}

function Note({note, isEdit, isView}:props) {
    const {remove, removingLoading, recover, setRecoveryIsClicked, toggle, switchViewMode, getCurrentNote, showRemovedNotesIsActive} = useContext(NoteContext)!
    return (
        <>
            <div className={styles.container}>
                <div className=
                    {note.completed ?  
                    `${styles.text} ${styles.crossedOut}`
                        : 
                    styles.text
                    }
                >
                    {note.title}
                </div>
                {!showRemovedNotesIsActive &&
                    <button 
                    onClick={()=>toggle(note.note_id, note.completed)} 
                    className={styles.toggle} 
                    >
                        {note.completed ? '✘' : '✔'}
                    </button>
                }
                {showRemovedNotesIsActive && 
                    <button onClick={()=>{
                        setRecoveryIsClicked(true)
                        setTimeout(() => {
                            recover(note.note_id)
                        }, 10);
                    }} className={styles.recover}>    
                            <span className={styles.recoverPlus}>+</span>
                    </button>
                }
                <button onClick={()=>{
                    setRecoveryIsClicked(false)
                    setTimeout(() => {
                        remove(note.note_id)
                    }, 10);
                }} className={styles.remove} 
>    
                        {removingLoading === note.note_id ?  <Spinner /> : <img src="./src/assets/icons/bin.png" alt="icon"/>}
                </button>
                <button onClick={()=>
                    {
                        switchViewMode(!isView)
                        getCurrentNote(note)
                    }} className={styles.view}>
                    <img src="./src/assets/icons/eye.png" alt="icon" />
                </button>
                {!showRemovedNotesIsActive && <EditButton isEdit={isEdit} note={note}/>}
            </div>
        </>
    )
}
export default Note