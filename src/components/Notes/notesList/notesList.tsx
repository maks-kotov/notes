import Note from './note/note'
import styles from './notesList.module.css'
import type { NoteType } from '../../../types/note'
// import { useAuth } from '../../../contexts/authContext'
import BigSpinner from '../../bigSpinner/bigSpinner'
interface props {
    displayedNotes: NoteType[],
    isEdit: boolean,
    isView: boolean,
    gettingLoading: boolean
}
function NotesList({displayedNotes, isEdit, isView, gettingLoading} : props) {
    // const {isLoading} = useAuth()
    
    console.log('перерисовка. видоизменённый массив: ', displayedNotes);
    return (
        <>
            <span className={styles.title}>Список:</span>
            {
                //если isLoading true - показываем спиннер, если нет - то, код заметок
            gettingLoading ?
               <BigSpinner />  // загрузка не отображается потому что она зависит от session, а не от времени добавления заметки  
            :
            displayedNotes.length === 0 ? (
                <p className={styles.emptyMessage}>Создайте первую заметку</p>
            ) 
            : 
            displayedNotes.map(note=> <Note isEdit={isEdit} isView={isView} note={note} key={note.note_id}/>)
            }
        </>
    )
}
export default NotesList