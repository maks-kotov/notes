import { useState } from "react";
import { NoteContext } from "../../contexts/noteContext";
import useNotes from "../../hooks/useNotes";
import type { NoteType } from "../../types/note";
import Create from "./create/create";
import Header from "./header/header";
import NotesList from "./notesList/notesList";
import Viewing from "./viewing/viewing";
import { FiltersContext } from "../../contexts/filtersContext";
import useFilters from "../../hooks/useFilters";

function Notes() {
  const {
    //тут методы заметок и информация про них
    allNotes,
    setAllNotes,
    update,
    add,
    remove,
    recover,
    toggle,
    addingLoading,
    gettingLoading,
    errorWhenAdding,
    recoveryIsClicked,
    setRecoveryIsClicked,
  } = useNotes();

  const {
    displayedNotes,
    sortByNew,
    sortByOld,
    sortByAlphabet,
    showAllNotes,
    filterByCompleteds,
    filterByUnCompleteds,
    showRemovedNotes,
    sortByNewIsActive,
    sortByOldIsActive,
    showAllNotesIsActive,
    filterByCompletedsIsActive,
    filterByUnCompletedsIsActive,
    sortByAlphabetIsActive,
    showRemovedNotesIsActive,
  } = useFilters(allNotes, setAllNotes);
  const [isEdit, setIsEdit] = useState<boolean>(false); //isEdit - edit mode state
  const [isView, setIsView] = useState<boolean>(false);
  const [currentNote, setCurrentNote] = useState<NoteType>({
    // редактируемая
    note_id: 0,
    title: "no",
    content: "no",
    completed: false,
    created_at: "what?",
    updated_at: "hello bro",
    removed_at: "im fine",
    recovered_at: "pipipip",
    removed_in_ui: false,
    temp_note_id: ".........",
    update_loading: false,
  });

  return (
    <>
      <NoteContext.Provider
        value={{
          update,
          remove,
          recover,
          toggle,
          switchEditMode: (isEdit: boolean) => setIsEdit(isEdit),
          switchViewMode: (isView: boolean) => setIsView(isView),
          getCurrentNote: (note: NoteType) => setCurrentNote(note),
          setRecoveryIsClicked,
        }}>
        <FiltersContext.Provider
          value={{
            sortByNew,
            sortByOld,
            sortByAlphabet,
            showAllNotes,
            filterByCompleteds,
            filterByUnCompleteds,
            showRemovedNotes,
            sortByNewIsActive,
            sortByOldIsActive,
            showAllNotesIsActive,
            filterByCompletedsIsActive,
            filterByUnCompletedsIsActive,
            sortByAlphabetIsActive,
            showRemovedNotesIsActive,
          }}>
          {!isEdit && !isView && <Header />}
          {/* {!isEdit && <Search />} */}
          {!isView && (
            <Create
              add={add}
              addingLoading={addingLoading}
              errorWhenAdding={errorWhenAdding}
              isEdit={isEdit}
              currentNote={currentNote}
            />
          )}
          {!isEdit && !isView && (
            <NotesList
              recoveryIsClicked={recoveryIsClicked}
              gettingLoading={gettingLoading}
              displayedNotes={displayedNotes}
              isEdit={isEdit}
              isView={isView}
              showRemovedNotesIsActive={showRemovedNotesIsActive}
            />
          )}
          {!isEdit && isView && (
            <Viewing currentNote={currentNote} isView={isView} />
          )}
        </FiltersContext.Provider>
      </NoteContext.Provider>
    </>
  );
}
export default Notes;
