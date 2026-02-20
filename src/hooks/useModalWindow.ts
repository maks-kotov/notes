import { useState } from "react";
import type { NoteType } from "../types/note";

export default function useModalWindow() {
  const [stateModalWindow, setStateModalWindow] = useState<boolean>(false);
  const [ref, setRef] = useState<
    HTMLButtonElement | HTMLDivElement | HTMLImageElement | null
  >(null);
  const [operatingNote, setOperatingNote] = useState<NoteType>({
    note_id: 0,
    title: "no",
    content: "no",
    completed: false,
    created_at: "no",
    updated_at: "no",
    removed_at: "no",
    recovered_at: "no",
    removed_in_ui: false,
    temp_note_id: "no",
    update_loading: false,
  });

  return {
    stateModalWindow,
    setStateModalWindow,
    setRef,
    ref,
    setOperatingNote,
    operatingNote,
  };
}
