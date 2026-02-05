import { useRef, useState } from "react"
import styles from "./contextMenu.module.css"
import NotesFilters from "./noteFilters/notesFilters"
import SignOut from "./signOut/signOut"
//отвечает за появление contextMenu
function ContextMenu() {
    const [stateContextMenu, setStateContextMenu] = useState<boolean>(false) 
    const contextMenuRef = useRef<HTMLUListElement>(null) //нужно для нажатия снаружи 
    const tribarRef = useRef<HTMLDivElement>(null)
    const signOutRef = useRef<HTMLImageElement>(null)
    const [filtersIsActive, setFiltersIsActive] = useState<boolean>(false) 
    const [signOutIsActive, setSignOutIsActive] = useState<boolean>(false) 
    function closeModalWindow() {
        setStateContextMenu(false)
    }
    function handleOnClickOutside(e: MouseEvent) {
        if(e.target instanceof Node 
            && tribarRef.current !== null
            && !tribarRef.current.contains(e.target) 
            && !contextMenuRef.current?.contains(e.target)
            && signOutRef.current !== null
            && !signOutRef.current.contains(e.target) 
        ) {
            closeModalWindow()  
        }
    }
    if(stateContextMenu) {
        document.addEventListener('click', handleOnClickOutside)
    }
    else {
        document.removeEventListener('click', handleOnClickOutside)
    }
    return (
            <>
                <div ref={tribarRef} className={styles.tribar} onClick={()=>{
                    setStateContextMenu(true)
                    setSignOutIsActive(false)
                    setFiltersIsActive(true)
                }}>
                    ≡
                </div>
                <img ref={signOutRef} className={styles.signOut} src="./src/assets/icons/opened_door.png" alt="sign out" onClick={()=>{
                    setStateContextMenu(true)
                    setFiltersIsActive(false)
                    setSignOutIsActive(true)
                }}/>
            {stateContextMenu && (
                <>
                    <ul className={styles.contextMenu} tabIndex={0} ref={contextMenuRef}>
                        {filtersIsActive&&<NotesFilters />}
                        {signOutIsActive&&
                        <SignOut closeModalWindow={closeModalWindow}/>
                        }
                    </ul>
                    <div className={styles.overlay}></div>
                </>
            )}
            </>
    )
}
export default ContextMenu