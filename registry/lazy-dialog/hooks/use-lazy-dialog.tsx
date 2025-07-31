/*!
 * Copyright (c) 2025 Alexis Bize
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { use } from 'react';
import { LazyDialogContext } from '@/registry/lazy-dialog/providers/lazy-dialog';

//#region hook

export const useLazyDialog = () => {
  const context = use(LazyDialogContext);
  if (context === void 0) {
    throw new Error('useLazyDialog must be used within a LazyDialogProvider');
  }

  return context;
};

//#endregion
