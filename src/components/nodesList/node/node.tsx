import styles from './node.module.css'
interface props {
    title: string
}
function Node({title}:props) {
    return (
        <>
            <div className={styles.node}>{title}</div>
        </>
    )
}
export default Node