/*!
 * Copyright (c) 2025 Alexis Bize
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Props as WithPropsProps } from '@/registry/lazy-dialog/providers/lazy-dialog/partials/with-custom-props';

//#region typings

export type LazyDialogType = 'with-custom-props' | 'without-custom-props';
export type LazyDialogProps = {
  'with-custom-props': WithPropsProps;
};

//#endregion
