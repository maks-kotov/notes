import type { NoteType } from "../note";
export type NoteContextType = {
  switchEditMode: (isEdit: boolean) => void;
  switchViewMode: (isView: boolean) => void;
  getCurrentNote: (note: NoteType) => void;
  update: (id: number, changes: NoteType) => void;
  remove: (id: number) => void;
  recover: (id: number) => void;
  toggle: (id: number, completed: boolean) => void;
  setRecoveryIsClicked: (b: boolean) => void; // нужен для анимаций
  setStateModalWindow: (b: boolean) => void;
  stateModalWindow: boolean;
  setRef: (
    myRef: HTMLButtonElement | HTMLDivElement | HTMLImageElement | null,
  ) => void;
  ref: HTMLButtonElement | HTMLDivElement | HTMLImageElement | null;
  setOperatingNote: (n: NoteType) => void;
  operatingNote: NoteType | null;
};
