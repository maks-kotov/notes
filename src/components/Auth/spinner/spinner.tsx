import styles from "./spinner.module.css"
interface props {
    style?: React.CSSProperties
}
function Spinner({style}:props) {
    return (
        <>
                <div className={styles.el2}>
                    <div style={style}>
                    
                    </div>
                </div>
        </>
    )
}
export default Spinner