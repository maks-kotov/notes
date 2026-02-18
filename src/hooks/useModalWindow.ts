import { useState } from "react";

export default function useModalWindow() {
  const [stateModalWindow, setStateModalWindow] = useState<boolean>(false);
  const [ref, setRef] = useState<
    HTMLButtonElement | HTMLDivElement | HTMLImageElement | null
  >(null);

  return {
    stateModalWindow,
    setStateModalWindow,
    setRef,
    ref,
  };
}
