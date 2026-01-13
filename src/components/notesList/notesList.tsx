import type { NoteType } from '../../types/note'
import Note from './note/note'
import styles from './notesList.module.css'
interface props {
    noteArr: NoteType[],
    switchEditMode: (isEdit:boolean)=>void,
    isEdit: boolean,
    getCurrentNote: (note:NoteType)=>void,
    editedNote: NoteType
}
function NodesList({noteArr, switchEditMode, isEdit, getCurrentNote, editedNote} : props) {
    console.log('changed: ', editedNote);

    return (
        <>
            <span className={styles.title}>Список:</span>
            
            
            {noteArr.length === 0 ? (
                <p className={styles.emptyMessage}>Создайте первую заметку</p>
            ) 
            : 
            noteArr.map((note, i)=> {
                // console.log(note);
                // console.log(editedNote);
                console.log(note);
                
                if(note.id === editedNote.id) {
                    // console.log(true);
                    console.log('before: ', note);
                    console.log('after: ', editedNote);
                    
                    
                }
                
                return (
                // если id текущей !== id нашей изменяймой, то пишем текст из массива, а если ===, то изменённый.
                // if(note.id) {
                // }
                <Note isEdit={isEdit} switchEditMode={switchEditMode} key={i} note={note} id={i} getCurrentNote={getCurrentNote}/>
                    
                )
            } 

            
            )}
        </>
    )
}
export default NodesList