import { useState, useEffect } from 'react';

// Custom hook that works just like useState, but automatically
// syncs the value to (and loads it from) the browser's localStorage.
export function useLocalStorage(key, initialValue) {
  
  // Lazy initializer: runs only once, on first render.
  // Checks if there's already a saved value under this key —
  // if so, use it; otherwise fall back to the default (initialValue).
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key); // localStorage only stores strings
    return stored ? JSON.parse(stored) : initialValue; // parse back into real data (array/object/etc)
  });

  // Runs every time `value` (or `key`) changes.
  // Writes the current value back into localStorage so it persists
  // across page refreshes and browser restarts.
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value)); // must stringify — localStorage can't store objects/arrays directly
  }, [key, value]);

  // Return the same shape as useState: [currentValue, setterFunction]
  // so components can use it as a drop-in replacement.
  return [value, setValue];
}