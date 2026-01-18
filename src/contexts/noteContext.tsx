import { createContext } from "react"
import type { NoteContextType } from "../types/contexts/noteContext"

export const NoteContext = createContext<NoteContextType | null>(null)