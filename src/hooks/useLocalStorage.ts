export function useLocalStorage() {
  function setLocalStorageItem(key: string, version: string, value: any) {
    localStorage.setItem(`${key}-${version}`, JSON.stringify(value));
  }

  function getLocalStorageItem(key: string, version: string) {
    const item = localStorage.getItem(`${key}-${version}`);

    if (item === null) {
      return [];
    } else {
      return JSON.parse(item);
    }
  }

  return {
    setLocalStorageItem,
    getLocalStorageItem,
  };
}
