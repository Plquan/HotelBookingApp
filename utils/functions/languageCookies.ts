import * as SecureStore from "expo-secure-store";

const LANGUAGE_KEY = "language";

const getLanguageCookie = async () => {
  return await SecureStore.getItemAsync(LANGUAGE_KEY);
};

const setLanguageCookie = async (lang: string) => {
  await SecureStore.setItemAsync(LANGUAGE_KEY, lang);
};

export default {
  getLanguageCookie,
  setLanguageCookie,
};
