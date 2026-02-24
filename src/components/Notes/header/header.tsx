import { useContext, useRef } from "react";
import styles from "./header.module.css";
import { NoteContext } from "../../../contexts/noteContext";
import opened_door from "../../../assets/icons/opened_door.png";
import tribar from "../../../assets/icons/tribar.png";
function Header() {
  const { setStateModalWindow, setRef } = useContext(NoteContext)!;
  const tribarRef = useRef<HTMLImageElement>(null);
  const signOutRef = useRef<HTMLImageElement>(null);
  return (
    <>
      <header className={styles.header}>Мои заметки</header>
      <img
        onClick={() => {
          setRef(tribarRef.current);
          setStateModalWindow(true);
        }}
        className={styles.tribar}
        src={tribar}
        alt="tribr"
        ref={tribarRef}
      />
      {/* <div
        // ref={tribarRef}
        className={styles.tribar}
        onClick={() => {
          setRef(tribarRef.current);
          setStateModalWindow(true);
        }}>
        ≡
      </div> */}
      <img
        ref={signOutRef}
        className={styles.signOut}
        src={opened_door}
        alt="sign out"
        onClick={() => {
          setRef(signOutRef.current);
          setStateModalWindow(true);
        }}
      />
    </>
  );
}
export default Header;
