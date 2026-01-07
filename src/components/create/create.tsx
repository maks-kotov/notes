import styles from './create.module.css'
function Create() {
    return (
        <>
            <textarea name="#" className={styles.textarea} placeholder='Создать заметку...'>
            </textarea>
            <div className={styles.right}>
                <button className={styles.button} type="submit">Добавить</button>
            </div>
        </>
    )
}
export default Create