import type { TComponentName } from '../types';

const createWebUnsupportedError = <T extends TComponentName>(componentName: T): Error => {
  return new Error(`${componentName} is not available on the web platform.`);
};

const createAndroidUnsupportedError = <T extends TComponentName>(componentName: T): Error => {
  return new Error(`${componentName} is not available on Android yet.`);
};

export { createWebUnsupportedError, createAndroidUnsupportedError };
