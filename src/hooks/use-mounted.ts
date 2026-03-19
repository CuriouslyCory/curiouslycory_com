import { useSyncExternalStore } from "react";

function noop() { /* no-op */ }
const subscribe = () => noop;
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function useMounted() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
