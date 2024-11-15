import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import { checkStorageIsAvailable, type storageType } from '../util/storageAvailable';

type PersistedState<T> = [T, Dispatch<SetStateAction<T>>];

function usePersistedState<T>(defaultValue: T, key: string, type: storageType = 'localStorage'): PersistedState<T> {
  const [value, setValue] = useState<T>(() => {
    const value = checkStorageIsAvailable(type) && window[type]?.getItem(key);

    return value ? (JSON.parse(value || "null") as T) : defaultValue;
  });

  useEffect(() => {
    checkStorageIsAvailable(type) && window[type]?.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export { usePersistedState };