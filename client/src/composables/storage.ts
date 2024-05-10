export const useStorage = () => {
  function set(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  function get(key: string): any {
    return JSON.parse(localStorage.getItem(key) as string);
  }
  function remove(key: string) {
    localStorage.removeItem(key);
  }
  function clear() {
    localStorage.clear();
  }

  return {
    set,
    get,
    remove,
    clear,
  };
};
