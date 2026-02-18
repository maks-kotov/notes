import { useAuth } from "../../../../../contexts/authContext";
import Spinner from "../../../../Auth/spinner/spinner";
import styles from "./signOut.module.css";
interface props {
  setStateModalWindow: (b: boolean) => void;
}
function SignOut({ setStateModalWindow }: props) {
  const { signOut, signOutIsLoading } = useAuth();
  return (
    <div className={styles.container}>
      <div className={styles.title}>Вы хотите выйти из аккаунта?</div>
      <div className={styles.variants}>
        <button
          onClick={signOut === null ? undefined : signOut}
          type="button"
          className={styles.variant}
          style={signOutIsLoading ? { opacity: 0.5 } : { opacity: 1 }}>
          <span className={styles.galochka}>✔</span>
          {signOutIsLoading ? <Spinner /> : "Да"}
        </button>
        <button
          onClick={() => setStateModalWindow(false)}
          type="button"
          className={styles.variant}>
          <span className={styles.krestik}>✘</span> Нет
        </button>
      </div>
    </div>
  );
}
export default SignOut;
