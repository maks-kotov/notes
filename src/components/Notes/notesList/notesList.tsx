import Note from './note/note'
import styles from './notesList.module.css'
import type { NoteType } from '../../../types/note'
import BigSpinner from '../../bigSpinner/bigSpinner';
import { memo } from 'react';
interface props {
    displayedNotes: NoteType[],
    isEdit: boolean,
    isView: boolean,
    gettingLoading: boolean,
    showRemovedNotesIsActive: boolean
}
function NotesList({displayedNotes, isEdit, isView, gettingLoading, showRemovedNotesIsActive} : props) {
    console.log('перерисовка. видоизменённый массив: ', displayedNotes);
    return (
        <>
            <span className={styles.title}>Список:</span>
            {
                //если gettingLoading true - показываем спиннер, если нет - то, код заметок
            gettingLoading ?
               <BigSpinner />
            :
            displayedNotes.length === 0 ? (
                <p className={styles.emptyMessage}>Создайте первую заметку</p>
            ) 
            : 
            displayedNotes.map(note=> {
                if(showRemovedNotesIsActive){
                    return <Note isEdit={isEdit} isView={isView} note={note} key={note.note_id}/>
                }
                else {
                    if(!note.removed_in_ui) {
                        return <Note isEdit={isEdit} isView={isView} note={note} key={note.note_id}/>
                    }
                }
            })
            }
        </>
    )
}
export default memo(NotesList)