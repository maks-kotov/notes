import { useState } from "react"
import { NoteContext } from "../../contexts/noteContext"
import useNotes from "../../hooks/useNotes"
import type { NoteType } from "../../types/note"
import Create from "./create/create"
import Header from "./header/header"
import NotesList from "./notesList/notesList"
import Viewing from "./viewing/viewing"

function Notes() {
    
    const { //тут методы заметок и информация про них
        displayedNotes,
        update, 
        add, 
        remove,
        recover, 
        toggle,
        sortByNew, 
        sortByOld,
        sortByAlphabet, 
        showAllNotes,
        filterByCompleteds,
        filterByUnCompleteds,
        gettingLoading,
        addingLoading,
        errorWhenAdding,
        removingLoading,
        recoveringLoading,
        editingLoading,
        toggleLoading,
        sortByNewIsActive,
        sortByOldIsActive,
        showAllNotesIsActive,
        filterByCompletedsIsActive,
        filterByUnCompletedsIsActive,
        sortByAlphabetIsActive,
        showRemovedNotes,
        showRemovedNotesIsActive
        } = useNotes()

    const [isEdit, setIsEdit] = useState<boolean>(false) //isEdit - edit mode state
    const [isView, setIsView] = useState<boolean>(false)
    const [currentNote, setCurrentNote] = useState<NoteType>( // редактируемая
    { 
      note_id: 0,
      title: 'no',
      content: 'no',
      completed: false,
      created_at: 'what?',
      updated_at: 'hello bro',
      removed_at: 'im fine',
      recovered_at: 'pipipip',
      removed_in_ui: false,
    }
)

    return (
        <>
            <NoteContext.Provider value={
                {
                    update,
                    remove,
                    recover,
                    toggle,
                    sortByNew,
                    sortByOld,
                    sortByAlphabet,
                    showRemovedNotes,
                    filterByCompleteds,
                    showAllNotes,
                    filterByUnCompleteds,
                    switchEditMode: (isEdit:boolean)=>setIsEdit(isEdit),
                    switchViewMode: (isView:boolean)=>setIsView(isView),
                    getCurrentNote: (note:NoteType)=>setCurrentNote(note),
                    removingLoading: removingLoading,
                    recoveringLoading,
                    editingLoading: editingLoading,
                    toggleLoading: toggleLoading,
                    sortByNewIsActive,
                    sortByOldIsActive,
                    showAllNotesIsActive,
                    filterByCompletedsIsActive,
                    filterByUnCompletedsIsActive,
                    sortByAlphabetIsActive,
                    showRemovedNotesIsActive
                }
            }>
                {!isEdit && !isView && <Header />} 
                {/* {!isEdit && <Search />} */}
                {
                !isView && 
                <Create  add={add} addingLoading={addingLoading} errorWhenAdding={errorWhenAdding} isEdit={isEdit} currentNote={currentNote}/>
                }
                {
                !isEdit && !isView && 
                <NotesList gettingLoading={gettingLoading} displayedNotes={displayedNotes} isEdit={isEdit} isView={isView} showRemovedNotesIsActive={showRemovedNotesIsActive}/>
                }
                {
                !isEdit && isView && 
                <Viewing currentNote={currentNote} isView={isView}/>
                }
            </NoteContext.Provider>
        </>
    )
}
export default Notes