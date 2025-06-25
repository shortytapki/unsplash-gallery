import { useState, useCallback } from "react";

export function useDisclosure(initialState: boolean = false) {
  const [opened, setOpened] = useState(initialState);

  const open = useCallback(() => setOpened(true), []);
  const close = useCallback(() => setOpened(false), []);
  const toggle = useCallback(() => setOpened((o) => !o), []);

  return [opened, { open, close, toggle }] as const;
}
