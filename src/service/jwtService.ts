import { getItem, setItem, removeItem } from '@/helpers/persistanceStorage';

const ID_TOKEN_KEY = 'accessToken';

export const getToken = () => {
  return getItem(ID_TOKEN_KEY);
};

export const saveToken = (token: string) => {
  setItem(ID_TOKEN_KEY, token);
};

export const destroyToken = () => {
  removeItem(ID_TOKEN_KEY);
};

export default { getToken, saveToken, destroyToken };