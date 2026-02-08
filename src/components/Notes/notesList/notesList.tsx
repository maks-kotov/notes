import Note from './note/note'
import styles from './notesList.module.css'
import type { NoteType } from '../../../types/note'
import BigSpinner from '../../bigSpinner/bigSpinner';
import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
interface props {
    displayedNotes: NoteType[],
    isEdit: boolean,
    isView: boolean,
    gettingLoading: boolean,
    showRemovedNotesIsActive: boolean,
    recoveryIsClicked: boolean
}
function NotesList({displayedNotes, isEdit, isView, gettingLoading, showRemovedNotesIsActive, recoveryIsClicked} : props) {
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
            // <>
            <AnimatePresence>
                {displayedNotes.map(note=> {
                    if(showRemovedNotesIsActive) {
                        if(note.removed_in_ui) {
                            return (
                                <motion.div 
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={
                                    recoveryIsClicked ?
                                    { opacity: 0, x: -50 } 
                                    : 
                                    { opacity: 0, x: 50 }
                                }
                                transition={{ duration: 0.3 }}
                                layout
                                key={note.note_id}
                                >
                                    <Note isEdit={isEdit} isView={isView} note={note} key={note.note_id}/>
                                </motion.div>
                            )
                        }
                    }
                    else {
                        if(!note.removed_in_ui) {
                            return (
                                <motion.div 
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                                transition={{ duration: 0.3 }}
                                layout
                                key={note.note_id}
                                >
                                    <Note isEdit={isEdit} isView={isView} note={note} key={note.note_id}/>
                                </motion.div>
                            )
                        }
                    }
                    return null
                })}
            </AnimatePresence>
            // </>
            }
        </>
    )
}
export default memo(NotesList)