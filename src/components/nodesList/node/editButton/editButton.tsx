import styles from './editButton.module.css'
function EditButton() {
    return (
                <button className={styles.edit}>
                    <img src="./src/assets/icons/edit.png" alt="icon" />
                </button>
    )
}
export default EditButton