import type { NoteType } from "../note"
export type NoteEditingActionsType = {
    switchEditMode: (isEdit:boolean)=>void,
    getEditingNote:(note:NoteType)=>void,
    update: (id:number, changes: NoteType)=>void
}