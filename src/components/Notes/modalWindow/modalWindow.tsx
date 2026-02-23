import { useCallback, useContext, useRef } from "react";
import styles from "./modalWindow.module.css";
import NotesFilters from "./noteFilters/notesFilters";
import SignOut from "./signOut/signOut";
import { NoteContext } from "../../../contexts/noteContext";
import ActionsWithNote from "./actionsWithNote/actionsWithNote";
//отвечает за появление contextMenu
function ModalWindow() {
  const { stateModalWindow, setStateModalWindow, ref } =
    useContext(NoteContext)!;
  const modalWindowRef = useRef<HTMLDivElement>(null); //нужно для нажатия снаружи

  const handleOnClickOutside = useCallback(
    (e: MouseEvent) => {
      if (
        e.target instanceof Node &&
        !modalWindowRef.current?.contains(e.target) &&
        ref !== null &&
        !ref.contains(e.target)
      ) {
        setStateModalWindow(false);
      }
    },
    [ref],
  );
  if (stateModalWindow) {
    document.addEventListener("click", handleOnClickOutside);
  } else {
    document.removeEventListener("click", handleOnClickOutside);
  }
  return (
    <>
      <div
        style={
          stateModalWindow
            ? ref?.className.includes("button_dropdown")
              ? { transform: "translate(-50%, -53%)" }
              : { transform: "translate(-50%, -75%)" }
            : {
                transform: "translate(-50%, -800px)",
              }
        }
        className={styles.modalWindow}
        tabIndex={0}
        ref={modalWindowRef}>
        {ref?.className.includes("button_dropdown") && <ActionsWithNote />}
        {ref?.className.includes("tribar") && <NotesFilters />}
        {ref?.className.includes("signOut") && (
          <SignOut setStateModalWindow={setStateModalWindow} />
        )}
      </div>
      <div
        style={
          stateModalWindow
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
  );
}
export default ModalWindow;
