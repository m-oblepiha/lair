import type { RootState } from 'redux/types';
import { debounce } from './debounce';

const KEY = 'redux';

const getState = (): RootState | undefined => {
  try {
    const state = localStorage.getItem(KEY);
    if (!state) return undefined;
    return JSON.parse(state);
  } catch (e) {
    console.log(
      'Сохранение прогресса невозможно – недоступно локальное хранилище.'
    );
    return undefined;
  }
};

const setState = debounce((state: RootState | null) => {
  try {
    if (!state) {
      localStorage.clear();
      return;
    }
    const serializedState = JSON.stringify(state);
    localStorage.setItem(KEY, serializedState);
  } catch (e) {
    return;
  }
}, 100);

export { getState, setState };
