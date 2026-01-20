import { useEffect, useState} from 'react'
import styles from './create.module.css'
import EditButton from '../notesList/note/editButton/editButton'
import type { NoteType } from '../../types/note'
interface props {
    isEdit: boolean,
    editingNote: NoteType,
    add: (note:NoteType)=>void
}
function Create({isEdit, editingNote, add} : props) {
    const [note, setNote] = useState<NoteType>({
                            id: 0,
                            title: 'no',
                            content: '',
                            completed: false,
                            createdAt: new Date(),
                        })
    const [counter, setCounter] = useState<number>(0)
    // console.log(counter);
    
    function changeValue(e:React.ChangeEvent<HTMLTextAreaElement>) {
        setNote({...note, content: e.target.value})
    }
    useEffect(()=>{
        if(isEdit) {
            setNote({...note, id: editingNote.id, title: editingNote.title,content:editingNote.content, completed: editingNote.completed, createdAt: editingNote.createdAt}) // при нажатии на кнопку готовая изменённая заметка приобретает все те же параметры, которые были у редактируемой. и  в nodesList я присваиваю свойствам редактируемой все значения изменённой  . рассказывать об этом в readme?
        }
        else {
            setNote({...note, content: ''})
        }
    },[isEdit])
    return (
        <>
            <textarea onChange={changeValue} name="#" className={styles.textarea} placeholder='Создать заметку...' value={note.content}>
                
            </textarea>
            <div className={styles.right}>
                {isEdit === false ? (
                    <button onClick={()=>{
                        add({
                            id: counter, // каждое нажатие на button меняет counter
                            title: note.title, // нам он ниоткуда не приходит.
                            content: note.content, // onChange меняет note.content
                            completed: note.completed, // нам он ниоткуда не приходит.
                            createdAt: new Date(), // каждый раз новая дата создания
                        })
                        setCounter((c)=>++c)
                        setNote({...note, content: ''})
                    }} className={styles.button} type="submit">Добавить</button>
                ) : <EditButton isEdit={isEdit} note={note} id={editingNote.id} changes={editingNote}/>}
            </div>
        </>
    )
}
export default Create