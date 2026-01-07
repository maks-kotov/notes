import styles from './header.module.css'
function Header() {
    return (
        <>
        <header className={styles.header}>
            Мои заметки
        </header>
            <span className={styles.tribar}>≡</span>
        </>
    )
}
export default Header