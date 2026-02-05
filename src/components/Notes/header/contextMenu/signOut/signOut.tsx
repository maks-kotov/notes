import { useAuth } from "../../../../../contexts/authContext"
import styles from "./signOut.module.css"
interface props {
    closeModalWindow: ()=>void
}
function SignOut({closeModalWindow}: props) {
    const {signOut} = useAuth()
    return (
        <div className={styles.container}>
            <div className={styles.title}>Вы хотите выйти из аккаунта?</div>
            <div className={styles.variants}>
                <button onClick={signOut === null ? undefined : signOut} type="button" className={styles.variant}>
                    <span className={styles.galochka}>✔</span> Да
                </button>
                <button onClick={closeModalWindow} type="button" className={styles.variant}>
                    <span className={styles.krestik}>✘</span> Нет
                </button>
            </div>
        </div>
    )
}
export default SignOut