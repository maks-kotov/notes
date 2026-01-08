import Node from './node/node'
import styles from './nodesList.module.css'
interface props {
    nodeArr: string[],
}
function NodesList({nodeArr} : props) {
    return (
        <>
            <span className={styles.title}>Список:</span>
            {nodeArr.length === 0 ? (
                <p className={styles.emptyMessage}>Создайте первую заметку</p>
            ) 
            : 
            nodeArr.map((text, i)=>(
                <Node key={i} text={text} />
            ))}
        </>
    )
}
export default NodesList