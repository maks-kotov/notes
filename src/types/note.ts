export type NoteType = {
    note_id: number,
    temp_note_id: string
    title: string,
    content: string,
    completed: boolean,
    created_at: string,
    updated_at: string | null,
    removed_at: string | null,
    recovered_at: null | string,
    removed_in_ui: boolean,
}
