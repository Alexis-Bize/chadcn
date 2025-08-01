/*!
 * Copyright (c) 2025 Alexis Bize
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { isBrowser } from '../helpers/environment';
import type { AppEvent, AppEventDetail } from './shared.types';

//#region typings

export type AppCustomEvent<T extends AppEvent> = CustomEvent<AppEventDetail[T]>;
export type TargetListener<T extends AppEvent> = (evt: AppCustomEvent<T>) => void;

//#endregion
//#region declarations

const CUSTOM_EVENT_PREFIX = 'app' as const;

//#endregion
//#region public methods

/**
 * @param {AppEvent} event
 * @param {T[AppEvent]} [detail]
 */
export const dispatchAppEvent = <T extends AppEvent>(event: T, detail?: AppEventDetail[T]) => {
  if (isBrowser() === false) {
    return;
  }

  const eventType = computeCustomEventType(event);
  const customEvent = new window.CustomEvent(eventType, { detail });
  window.dispatchEvent(customEvent);
};

/**
 * @param {AppEvent} event
 * @param {TargetListener<T>} listener
 * @returns {void}
 */
export const listenAppEvent = <T extends AppEvent>(event: T, listener: TargetListener<T>): void => {
  if (isBrowser() === false) {
    return;
  }

  const eventType = computeCustomEventType(event);
  // @ts-expect-error missing CustomEvent type mapping in lib.dom.d.ts
  window.addEventListener(eventType, listener);
};

/**
 * @param {AppEvent} event
 * @param {TargetListener<T>} listener
 * @returns {void}
 */
export const removeAppEvent = <T extends AppEvent>(event: T, listener: TargetListener<T>): void => {
  if (isBrowser() === false) {
    return;
  }

  const eventType = computeCustomEventType(event);
  // @ts-expect-error missing CustomEvent type mapping in lib.dom.d.ts
  window.removeEventListener(eventType, listener);
};

//#endregion
//#region private methods

/**
 * @param {AppEvent} event
 * @returns {string}
 */
const computeCustomEventType = (event: AppEvent): string => [CUSTOM_EVENT_PREFIX, event].join(':');

//#endregion
