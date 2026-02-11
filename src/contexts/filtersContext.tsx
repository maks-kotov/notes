import { createContext } from "react";
import type { FiltersContextType } from "../types/contexts/filtersContext";

export const FiltersContext = createContext<FiltersContextType | null>(null);
