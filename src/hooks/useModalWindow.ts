import { useState } from "react";
import type { NoteType } from "../types/note";

export default function useModalWindow() {
  const [stateModalWindow, setStateModalWindow] = useState<boolean>(false);
  const [ref, setRef] = useState<
    HTMLButtonElement | HTMLDivElement | HTMLImageElement | null
  >(null);
  const [operatingNote, setOperatingNote] = useState<NoteType | null>(null);

  return {
    stateModalWindow,
    setStateModalWindow,
    setRef,
    ref,
    setOperatingNote,
    operatingNote,
  };
}
