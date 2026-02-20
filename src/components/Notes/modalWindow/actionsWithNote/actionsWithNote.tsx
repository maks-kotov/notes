import { useContext } from "react";
import styles from "./actionsWithNote.module.css";
import { NoteContext } from "../../../../contexts/noteContext";
import EditButton from "../../notesList/note/editButton/editButton";
import { FiltersContext } from "../../../../contexts/filtersContext";

const ActionsWithNote = () => {
  const {
    operatingNote,
    setOperatingNote,
    toggle,
    switchEditMode,
    switchViewMode,
    remove,
    recover,
    setStateModalWindow,
    getCurrentNote,
    setRecoveryIsClicked,
  } = useContext(NoteContext)!;
  const { showRemovedNotesIsActive } = useContext(FiltersContext)!;

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Заметка "<span>{operatingNote.title}</span>"
      </div>
      <div className={styles.chooseAction}>Выберите действие:</div>
      {!showRemovedNotesIsActive && (
        <div
          className={styles.action}
          onClick={() => {
            toggle(operatingNote.note_id, operatingNote.completed);
            setOperatingNote({
              ...operatingNote,
              completed: !operatingNote.completed,
            });
          }}>
          <button className={`${styles.toggle}`}>
            {operatingNote?.completed ? "✘" : "✔"}
          </button>
          <span>
            Пометить как
            {operatingNote?.completed ? " невыполненное" : " выполненное"}
          </span>
        </div>
      )}
      <div
        className={styles.action}
        onClick={() => {
          setStateModalWindow(false);
          setRecoveryIsClicked(false);
          setTimeout(() => {
            remove(operatingNote?.note_id);
          }, 1);
        }}>
        <button className={`${styles.icon} ${styles.remove}`}>
          <img src="./src/assets/icons/bin.png" alt="bin" />
        </button>
        <span>Удалить</span>
      </div>
      <div
        className={styles.action}
        onClick={() => {
          setStateModalWindow(false);
          switchViewMode(true);
          operatingNote && getCurrentNote(operatingNote);
        }}>
        <button className={`${styles.icon} ${styles.view}`}>
          <img src="./src/assets/icons/eye.png" alt="bin" />
        </button>
        <span>Смотреть</span>
      </div>
      {!showRemovedNotesIsActive && (
        <div
          className={styles.action}
          onClick={() => {
            setStateModalWindow(false);
            switchEditMode(true);
            getCurrentNote(operatingNote);
          }}>
          <EditButton note={operatingNote} hideOnMobile={false} />
          <span>Редактировать</span>
        </div>
      )}
      {showRemovedNotesIsActive && (
        <div
          className={styles.action}
          onClick={() => {
            setStateModalWindow(false);
            setRecoveryIsClicked(true);
            setTimeout(() => {
              recover(operatingNote.note_id);
            }, 1);
          }}>
          <button className={`${styles.recover} ${styles.icon}`}>
            <span className={styles.plus}>+</span>
          </button>
          <span>Восстановить</span>
        </div>
      )}
      <div className={styles.action} onClick={() => setStateModalWindow(false)}>
        <button className={`${styles.exit} ${styles.icon}`}>
          <span className={styles.krestik}>✘</span>
        </button>
        <span>Выйти</span>
      </div>
    </div>
  );
};
export default ActionsWithNote;
