import Node from './node/node'
import styles from './nodesList.module.css'
function NodesList() {
    return (
        <>
            <span className={styles.title}>Список:</span>
            <Node title={'Прив'}/>
        </>
    )
}
export default NodesList