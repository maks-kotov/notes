import { useState } from "react";

export default function useModalWindow() {
  const [stateContextMenu, setStateContextMenu] = useState<boolean>(false);
  function closeModalWindow() {
    setStateContextMenu(false);
  }
  function handleOnClickOutside(e: MouseEvent) {
    if (
      e.target instanceof Node &&
      tribarRef.current !== null &&
      !tribarRef.current.contains(e.target) &&
      !modalWindowRef.current?.contains(e.target) &&
      signOutRef.current !== null &&
      !signOutRef.current.contains(e.target)
    ) {
      closeModalWindow();
    }
  }
  if (stateContextMenu) {
    document.addEventListener("click", handleOnClickOutside);
  } else {
    document.removeEventListener("click", handleOnClickOutside);
  }
}
