import EditButton from './editButton/editButton'
import styles from './node.module.css'
interface props {
    text: string,
}
function Node({text}:props) {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.text}>{text}</div>
                <button className={styles.made}>✔</button>
                <button className={styles.delete}>✗</button>
                <EditButton />
            </div>
        </>
    )
}
export default Node