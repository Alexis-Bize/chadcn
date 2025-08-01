/*!
 * Copyright (c) 2025 Alexis Bize
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

//#region typings

export type Env = (typeof AVAILABLE_ENV)[number];

//#endregion
//#region definitions

/**
 * @constant
 */
const AVAILABLE_ENV = ['production', 'development', 'staging', 'test'] as const;

//#endregion
//#region public methods

/**
 * @returns {Env}
 */
export const getEnv = (): Env => {
  const env = process.env.NODE_ENV;

  if (env === void 0) {
    throw new Error('Missing "NODE_ENV" environment variable');
  } else if (AVAILABLE_ENV.includes(env as never) === false) {
    throw new Error('An unknown env has been provided');
  } else return env as Env;
};

/**
 * @returns {boolean}
 */
export const isProduction = (): boolean => getEnv() === 'production';

/**
 * @returns {boolean}
 */
export const isDevelopment = (): boolean => getEnv() === 'development';

/**
 * @returns {boolean}
 */
export const isStaging = (): boolean => getEnv() === 'staging';

/**
 * @returns {boolean}
 */
export const isTest = (): boolean => getEnv() === 'test';

/**
 * @returns {boolean}
 */
export const isBrowser = (): boolean => [typeof window, typeof document].includes('undefined') === false;

//#endregion
