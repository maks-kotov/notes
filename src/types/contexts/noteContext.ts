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
  setStateContextMenu: (b: boolean) => void;
  stateContextMenu: boolean;
};
