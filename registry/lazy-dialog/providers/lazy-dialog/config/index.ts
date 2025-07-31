/*!
 * Copyright (c) 2025 Alexis Bize
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import type { LazyDialogType } from '@/registry/lazy-dialog/providers/lazy-dialog/config/dialogs.types';

//#region config

const lazyDialogs = {
  'with-custom-props': () => import('../partials/with-custom-props'),
  'without-custom-props': () => import('../partials/without-custom-props'),
} as const satisfies Record<LazyDialogType, () => Promise<{ default: unknown }>>;

const config = {
  lazyDialogs,
} as const;

//#endregion

export { config };
