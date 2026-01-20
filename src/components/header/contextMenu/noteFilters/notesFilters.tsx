import { useContext } from "react"
import styles from "./notesFilters.module.css"
import { NoteContext } from "../../../../contexts/noteContext"
function NotesFilters() {
    const { sortByNew } = useContext(NoteContext)!
    return (
            <div className={styles.filtersContainer}>
                <li onClick={()=>sortByNew()} className={styles.beginNew}>Cначала новые</li>
                <li className={styles.beginOld}>
                    Cначала старые
                </li>
                <li className={styles.beginName}>Сортировать по алфавиту</li>
                <li className={styles.completeds}>Выполненные</li>
                <li className={styles.uncompleteds}>Невыполненные</li>
                <li className={styles.removeds}>Удалённые</li>
            </div>
    )
}
export default NotesFilters