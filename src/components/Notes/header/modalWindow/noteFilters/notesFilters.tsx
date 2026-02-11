import { useContext } from "react"
import styles from "./notesFilters.module.css"
import { NoteContext } from "../../../../../contexts/noteContext"
function NotesFilters() {
    const { sortByNew, sortByOld, filterByCompleteds, showAllNotes, filterByUnCompleteds, sortByNewIsActive, sortByOldIsActive, sortByAlphabet, filterByCompletedsIsActive, filterByUnCompletedsIsActive, showAllNotesIsActive, sortByAlphabetIsActive, showRemovedNotes, showRemovedNotesIsActive } = useContext(NoteContext)!
    
    return (
        <div className={styles.filtersContainer}>
            <div className={styles.title}>Фильтры:</div>

            <li onClick={showAllNotes} className={styles.all}>
                Все 
                {showAllNotesIsActive&&<span className={styles.galochka}>✔</span>}
            </li>
            <li onClick={()=>filterByCompleteds()} className={styles.completeds}>
                Выполненные 
                {filterByCompletedsIsActive&&<span className={styles.galochka}>✔</span>} 
            </li>
            <li onClick={()=>filterByUnCompleteds()} className={styles.uncompleteds}>
                Невыполненные 
                {filterByUnCompletedsIsActive&&<span className={styles.galochka}>✔</span>}
            </li>
            <li onClick={()=>showRemovedNotes()} className={styles.removeds}>
                Удалённые 
                {showRemovedNotesIsActive&&<span className={styles.galochka}>✔</span>}
            </li>
            
            <div className={styles.title2}>Порядок:</div>
            
            <li onClick={()=>sortByNew()} className={styles.beginNew}>
                Cначала новые
                <input onChange={()=>null} type="checkbox" checked={sortByNewIsActive}/>
            </li>
            <li onClick={()=>sortByOld()} className={styles.beginOld}>
                Cначала старые
                <input onChange={()=>null} type="checkbox" checked={sortByOldIsActive}/>
            </li>
            <li onClick={()=>sortByAlphabet()} className={styles.beginName}>
                По алфавиту
                <input onChange={()=>null} type="checkbox" checked={sortByAlphabetIsActive}/>
            </li>
        </div>
    )
}
export default NotesFilters