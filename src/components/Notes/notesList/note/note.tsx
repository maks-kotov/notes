import { useContext, useRef } from "react";
import EditButton from "./editButton/editButton";
import styles from "./note.module.css";
import type { NoteType } from "../../../../types/note";
import { NoteContext } from "../../../../contexts/noteContext";
import { FiltersContext } from "../../../../contexts/filtersContext";
import bin from "../../../../assets/icons/bin.png";
import eye from "../../../../assets/icons/eye.png";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";
interface props {
  note: NoteType;
}
function Note({ note }: props) {
  const {
    remove,
    recover,
    toggle,
    switchViewMode,
    getCurrentNote,
    setRecoveryIsClicked,
    setStateModalWindow,
    setRef,
    setOperatingNote,
  } = useContext(NoteContext)!;
  const { showRemovedNotesIsActive } = useContext(FiltersContext)!;
  // const [dropdownIsClicked, setDropdownIsClicked] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const isMobile = useMediaQuery("(max-width: 700px)");

  return (
    <>
      <div className={styles.container}>
        <div
          style={{
            opacity: note.update_loading ? 0.2 : 1,
            // textDecoration: note.completed ? "line-through" : "none",
          }}
          className={styles.text}>
          <span
            className={`${styles.strike} ${note.completed ? styles.completed : ""}`}>
            {note.title}
          </span>
        </div>

        {!showRemovedNotesIsActive && !isMobile && (
          <button
            onClick={() => toggle(note.note_id, note.completed)}
            className={styles.toggle}>
            {note.completed ? "✘" : "✔"}
          </button>
        )}

        {showRemovedNotesIsActive && !isMobile && (
          <button
            onClick={() => {
              setRecoveryIsClicked(true);
              setTimeout(() => {
                recover(note.note_id);
              }, 10);
            }}
            className={styles.recover}>
            <span className={styles.recoverPlus}>+</span>
          </button>
        )}
        {!isMobile && (
          <button
            onClick={() => {
              setRecoveryIsClicked(false);
              setTimeout(() => {
                remove(note.note_id);
              }, 10);
            }}
            className={styles.remove}>
            <img src={bin} alt="bin" />
          </button>
        )}
        {!isMobile && (
          <button
            onClick={() => {
              switchViewMode(true);
              getCurrentNote(note);
            }}
            className={styles.view}>
            <img src={eye} alt="icon" />
          </button>
        )}

        {!showRemovedNotesIsActive && !isMobile && <EditButton note={note} />}
        {isMobile && (
          <button
            ref={buttonRef}
            onClick={() => {
              setRef(buttonRef.current);
              setOperatingNote(note);
              setStateModalWindow(true);
            }}
            className={styles.button_dropdown}>
            <div className={styles.dots}>...</div>
          </button>
        )}
      </div>
    </>
  );
}
export default Note;
