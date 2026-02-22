import { useContext } from "react";
import styles from "./editButton.module.css";
import type { NoteType } from "../../../../../types/note";
import { NoteContext } from "../../../../../contexts/noteContext";
import edit from "../../../../../assets/icons/edit.png";

interface props {
  note: NoteType; // note - заметка на которую мы нажали если isEdit === false или note - видоизменённая заметка если isEdit === true
  hideOnMobile: boolean;
}
function EditButton({ note, hideOnMobile }: props) {
  const { isEdit } = useContext(NoteContext)!;
  const { getCurrentNote, switchEditMode, update } = useContext(NoteContext)!;

  return (
    <button
      onClick={() => {
        if (!isEdit) {
          getCurrentNote(note);
        } else {
          update(note.note_id, note);
        }
        switchEditMode(!isEdit);
      }}
      className={`${styles.edit} ${hideOnMobile ? styles.hideOnMobile : ""}`}>
      <img src={edit} alt="icon" />
    </button>
  );
}
export default EditButton;
