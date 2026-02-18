import { useContext, useRef } from "react";
import styles from "./header.module.css";
import ModalWindow from "./modalWindow/modalWindow";
import { NoteContext } from "../../../contexts/noteContext";
function Header() {
  const { setStateModalWindow, setRef } = useContext(NoteContext)!;
  const tribarRef = useRef<HTMLDivElement>(null);
  const signOutRef = useRef<HTMLImageElement>(null);
  return (
    <>
      <header className={styles.header}>Мои заметки</header>

      {/* {stateContextMenu && ( */}
      <div
        ref={tribarRef}
        className={styles.tribar}
        onClick={() => {
          setRef(tribarRef.current);
          setStateModalWindow(true);
          //   setStateContextMenu(true);
          //   setSignOutIsActive(false);
          //   setFiltersIsActive(true);
        }}>
        ≡
      </div>
      <img
        ref={signOutRef}
        className={styles.signOut}
        src="./src/assets/icons/opened_door.png"
        alt="sign out"
        onClick={() => {
          setRef(signOutRef.current);
          setStateModalWindow(true);
          //   setStateContextMenu(true);
          //   setFiltersIsActive(false);
          //   setSignOutIsActive(true);
        }}
      />
      <ModalWindow />
    </>
  );
}
export default Header;
