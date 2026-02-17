import { useContext, useRef, useState } from "react";
import styles from "./modalWindow.module.css";
import NotesFilters from "./noteFilters/notesFilters";
import SignOut from "./signOut/signOut";
import { NoteContext } from "../../../../contexts/noteContext";
//отвечает за появление contextMenu

function ModalWindow() {
  const { stateContextMenu, setStateContextMenu } = useContext(NoteContext)!;
  const modalWindowRef = useRef<HTMLDivElement>(null); //нужно для нажатия снаружи
  const tribarRef = useRef<HTMLDivElement>(null);
  const signOutRef = useRef<HTMLImageElement>(null);
  const [filtersIsActive, setFiltersIsActive] = useState<boolean>(false);
  const [signOutIsActive, setSignOutIsActive] = useState<boolean>(false);
  console.log(stateContextMenu);
  function closeModalWindow() {
    setStateContextMenu(false);
  }
  function handleOnClickOutside(e: MouseEvent) {
    if (
      e.target instanceof Node &&
      tribarRef.current !== null &&
      !tribarRef.current.contains(e.target) &&
      !modalWindowRef.current?.contains(e.target) &&
      signOutRef.current !== null &&
      !signOutRef.current.contains(e.target)
    ) {
      closeModalWindow();
    }
  }
  if (stateContextMenu) {
    document.addEventListener("click", handleOnClickOutside);
  } else {
    document.removeEventListener("click", handleOnClickOutside);
  }
  return (
    <>
      <div
        ref={tribarRef}
        className={styles.tribar}
        onClick={() => {
          setStateContextMenu(true);
          setSignOutIsActive(false);
          setFiltersIsActive(true);
        }}>
        ≡
      </div>
      <img
        ref={signOutRef}
        className={styles.signOut}
        src="./src/assets/icons/opened_door.png"
        alt="sign out"
        onClick={() => {
          setStateContextMenu(true);
          setFiltersIsActive(false);
          setSignOutIsActive(true);
        }}
      />
      <>
        <div
          style={
            stateContextMenu
              ? {
                  transform: "translate(-50%, -75%)",
                }
              : {
                  transform: "translate(-50%, -600px)",
                }
          }
          className={styles.contextMenu}
          tabIndex={0}
          ref={modalWindowRef}>
          {filtersIsActive && <NotesFilters />}
          {signOutIsActive && <SignOut closeModalWindow={closeModalWindow} />}
        </div>
        <div
          style={
            stateContextMenu
              ? {
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                }
              : {
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  zIndex: -1,
                }
          }
          className={styles.overlay}></div>
      </>
    </>
  );
}
export default ModalWindow;
