/*!
 * Copyright (c) 2025 Alexis Bize
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Button } from '@/registry/lazy-dialog/components/ui/button';
import { useLazyDialog } from '@/registry/lazy-dialog/hooks/use-lazy-dialog';
import type { DialogContentProps } from '@/registry/lazy-dialog/providers/lazy-dialog/shared.types';

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/registry/lazy-dialog/components/ui/dialog';

//#region typings

export type Props = {
  onConfirm: () => void;
} & DialogContentProps;

//#endregion
//#region component

const LazyDialogWithCustomProps = ({ onConfirm, ...props }: Props) => {
  //#region hooks

  const { openDialog } = useLazyDialog();

  //#endregion
  //#region render

  return (
    <DialogContent {...props}>
      <DialogHeader>
        <DialogTitle>With props</DialogTitle>
        <DialogDescription>This is a dialog with props</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button onClick={onConfirm}>Confirm</Button>
        <Button onClick={() => openDialog('without-custom-props')}>Open a new dialog</Button>
      </DialogFooter>
    </DialogContent>
  );

  //#endregion
};

//#endregion

export default LazyDialogWithCustomProps;
