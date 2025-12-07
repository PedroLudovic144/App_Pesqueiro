// utils/storage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getKey<T = any>(key: string): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.log("storage.getKey error", key, err);
    return null;
  }
}

export async function setKey(key: string, value: any): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.log("storage.setKey error", key, err);
  }
}
