import { memo, useContext } from "react";
import styles from "./actionsWithNote.module.css";
import { NoteContext } from "../../../../contexts/noteContext";

const ActionsWithNote = () => {
  const {
    operatingNote,
    setOperatingNote,
    toggle,
    update,
    switchEditMode,
    switchViewMode,
    remove,
    recover,
    setStateModalWindow,
    getCurrentNote,
  } = useContext(NoteContext)!;

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Заметка "<span>{operatingNote?.title}</span>"
      </div>
      <div className={styles.chooseAction}>Выберите действие:</div>
      <div
        className={styles.action}
        onClick={() =>
          operatingNote &&
          toggle(operatingNote.note_id, operatingNote.completed) &&
          setOperatingNote({
            ...operatingNote,
            completed: !operatingNote.completed,
          })
        }>
        <button className={`${styles.toggle}`}>
          {operatingNote?.completed ? "✘" : "✔"}
        </button>
        <span>
          Пометить как
          {operatingNote?.completed ? " невыполненное" : " выполненное"}
        </span>
      </div>
      <div
        className={styles.action}
        onClick={() =>
          operatingNote &&
          remove(operatingNote?.note_id) &&
          setStateModalWindow(false)
        }>
        <button className={`${styles.icon} ${styles.remove}`}>
          <img src="./src/assets/icons/bin.png" alt="bin" />
        </button>
        <span>Удалить</span>
      </div>
      <div
        className={styles.action}
        onClick={(e) => {
          setStateModalWindow(false);
          switchViewMode(true);
          operatingNote && getCurrentNote(operatingNote); // долбал функции для заметок в модальном окне
        }}>
        <button className={`${styles.icon} ${styles.view}`}>
          <img src="./src/assets/icons/eye.png" alt="bin" />
        </button>
        <span>Смотреть</span>
      </div>
      <div className={styles.action}>
        <button className={`${styles.icon} ${styles.edit}`}>
          <img src="./src/assets/icons/edit.png" alt="bin" />
        </button>
        <span>Редактировать</span>
      </div>
      <div className={styles.action}>
        <button className={`${styles.recover} ${styles.icon}`}>
          <span className={styles.plus}>+</span>
        </button>
        <span>Восстановить</span>
      </div>
      <div className={styles.action}>
        <button className={`${styles.exit} ${styles.icon}`}>
          <span className={styles.krestik}>✘</span>
        </button>
        <span>Выйти</span>
      </div>
    </div>
  );
};
export default ActionsWithNote;
