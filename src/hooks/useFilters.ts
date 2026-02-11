import { useState } from "react";
import type { NoteType } from "../types/note";

export default function useFilters(
  allNotes: NoteType[],
  setAllNotes: (allNotes: NoteType[]) => void,
) {
  const [filteredNotes, setFilteredNotes] = useState<null | NoteType[]>(null);
  const displayedNotes = filteredNotes === null ? allNotes : filteredNotes;
  const [sortByNewIsActive, setSortByNewIsActive] = useState<boolean>(true);
  const [sortByOldIsActive, setSortByOldIsActive] = useState<boolean>(false);
  const [sortByAlphabetIsActive, setSortByAlphabetIsActive] =
    useState<boolean>(false);
  const [showAllNotesIsActive, setShowAllNotesIsActive] =
    useState<boolean>(true);
  const [filterByCompletedsIsActive, setFilterByCompletedsIsActive] =
    useState<boolean>(false);
  const [filterByUnCompletedsIsActive, setFilterByUnCompletedsIsActive] =
    useState<boolean>(false);
  const [showRemovedNotesIsActive, setShowRemovedNotesIsActive] =
    useState<boolean>(false);

  const sortByNew = () => {
    setSortByNewIsActive(true);
    setSortByOldIsActive(false);
    setSortByAlphabetIsActive(false);

    setAllNotes(
      [...allNotes].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      ),
    );
  };
  const sortByOld = () => {
    setSortByOldIsActive(true);
    setSortByNewIsActive(false);
    setSortByAlphabetIsActive(false);

    setAllNotes(
      [...allNotes].sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      ),
    );
  };
  const sortByAlphabet = () => {
    setSortByAlphabetIsActive(true);
    setSortByOldIsActive(false);
    setSortByNewIsActive(false);
    setAllNotes(
      [...allNotes].sort((a, b) =>
        a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
      ),
    ); //изменение самого массива allNotes
  };
  //фильтры:
  const showAllNotes = () => {
    setShowAllNotesIsActive(true);
    setShowRemovedNotesIsActive(false);
    setFilterByCompletedsIsActive(false);
    setFilterByUnCompletedsIsActive(false);
    setFilteredNotes(null);
  };
  const showRemovedNotes = () => {
    setShowAllNotesIsActive(false);
    setFilterByCompletedsIsActive(false);
    setFilterByUnCompletedsIsActive(false);
    setShowRemovedNotesIsActive(true);
    setFilteredNotes(null);
  };
  const filterByCompleteds = () => {
    setFilteredNotes(null);
    setShowAllNotesIsActive(false);
    setShowRemovedNotesIsActive(false);
    setFilterByCompletedsIsActive(true);
    setFilterByUnCompletedsIsActive(false);
    const filtered = allNotes.filter((note) => note.completed);
    setFilteredNotes(filtered);
  };
  const filterByUnCompleteds = () => {
    setShowAllNotesIsActive(false);
    setShowRemovedNotesIsActive(false);
    setFilterByCompletedsIsActive(false);
    setFilterByUnCompletedsIsActive(true);
    setFilteredNotes(null);
    const filtered = allNotes.filter((note) => !note.completed);
    setFilteredNotes(filtered);
  };
  return {
    displayedNotes,
    sortByNew,
    sortByNewIsActive,
    sortByOld,
    sortByOldIsActive,
    sortByAlphabet,
    sortByAlphabetIsActive,
    filterByCompleteds,
    filterByCompletedsIsActive,
    filterByUnCompleteds,
    filterByUnCompletedsIsActive,
    showAllNotes,
    showAllNotesIsActive,
    showRemovedNotes,
    showRemovedNotesIsActive,
  };
}
