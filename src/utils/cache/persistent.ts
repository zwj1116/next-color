import { MQTT_MESSAGE, TOKEN_KEY } from '@/enums/cacheEnum';
import { toRaw } from 'vue';

import Lockr from 'lockr';

interface BasicStore {
  [TOKEN_KEY]: string;
  [MQTT_MESSAGE]: any;
}

export type BasicKeys = keyof BasicStore;
type LocalKeys = keyof BasicStore;

export class Persistent {
  static getLocal<T>(key: LocalKeys): T {
    return Lockr.get(key) as T;
  }

  static setLocal(key: LocalKeys, value: BasicStore[LocalKeys]): void {
    Lockr.set(key, toRaw(value));
  }

  static removeLocal(key: LocalKeys): void {
    Lockr.rm(key);
  }
}
