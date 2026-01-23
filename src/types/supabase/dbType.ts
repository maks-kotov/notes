import type { NoteType } from "../note";

export type TodoInsert = Omit<NoteType, 'id' | 'created_at'>; // зачем id | createAt
export type TodoUpdate = Partial<Omit<NoteType, 'id' | 'created_at'>>;