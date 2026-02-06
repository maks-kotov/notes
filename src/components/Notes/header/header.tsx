import styles from './header.module.css'
import ModalWindow from './modalWindow/modalWindow'
function Header() {
    
    return (
        <>
        <header className={styles.header}>
            Мои заметки
        </header>
            
        <ModalWindow />
        </>
    )
}
export default Header