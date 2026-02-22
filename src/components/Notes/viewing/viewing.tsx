import { useContext } from "react";
import styles from "./viewing.module.css";
import type { NoteType } from "../../../types/note";
import { NoteContext } from "../../../contexts/noteContext";
import arrow from "../../../assets/icons/arrow.png";
interface props {
  currentNote: NoteType;
}

function Viewing({ currentNote }: props) {
  // console.log('я сработал (viewing)');

  //работаем с viewing
  const { switchViewMode } = useContext(NoteContext)!;
  return (
    <>
      <div onClick={() => switchViewMode(false)} className={styles.back1}>
        <img src={arrow} alt="arrow" />
      </div>
      <div className={styles.container}>
        <div className={styles.title}>{currentNote.title}</div>
        <div className={styles.text}>{currentNote.content}</div>
      </div>
      <div onClick={() => switchViewMode(false)} className={styles.back2}>
        <img src={arrow} alt="arrow" />
      </div>
    </>
  );
}
export default Viewing;
