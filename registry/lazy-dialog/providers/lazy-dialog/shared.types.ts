/*!
 * Copyright (c) 2025 Alexis Bize
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { DialogContent } from '../../../../app/components/ui/dialog';
import type { LazyDialogProps, LazyDialogType } from './config/dialogs.types';

//#region typings

export type LazyDialogPropsWithContentProps<T extends LazyDialogType> = LazyDialogPropsForType<T>;
export type LazyDialogPropsForType<T extends LazyDialogType> = T extends keyof LazyDialogProps
  ? LazyDialogProps[T] & DialogContentProps
  : DialogContentProps;

export type LazyDialogState<T extends LazyDialogType = LazyDialogType> = {
  type: T;
  props: LazyDialogPropsWithContentProps<T>;
} | null;

export type LazyDialogContextType = {
  dialog: LazyDialogState;
  isOpen: boolean;
  closeDialog: () => void;
  openDialog: {
    <T extends keyof LazyDialogProps>(type: T, props: LazyDialogProps[T] & DialogContentProps): void;
    <T extends Exclude<LazyDialogType, keyof LazyDialogProps>>(type: T, props?: DialogContentProps): void;
  };
};

export type DialogContentProps = Parameters<typeof DialogContent>[0];

//#endregion
