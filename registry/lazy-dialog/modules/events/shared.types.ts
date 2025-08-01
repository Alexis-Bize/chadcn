/*!
 * Copyright (c) 2025 Alexis Bize
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import type { LazyDialogType, LazyDialogProps } from '../../providers/lazy-dialog/config/dialogs.types';
import type { LazyDialogPropsWithContentProps } from '../../providers/lazy-dialog/shared.types';

//#region typings

type DialogShowEventProps<T extends LazyDialogType> = T extends keyof LazyDialogProps
  ? { type: T; props: LazyDialogProps[T] & LazyDialogPropsWithContentProps<T> }
  : { type: T; props?: LazyDialogPropsWithContentProps<T> };

export type AppEvent = 'dialog:show' | 'dialog:close';
export type AppEventDetail = {
  'dialog:show': DialogShowEventProps<LazyDialogType>;
  'dialog:close': void;
};

//#endregion
