/*!
 * Copyright (c) 2025 Alexis Bize
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Button } from '@/registry/lazy-dialog/components/ui/button';
import type { DialogContentProps } from '@/registry/lazy-dialog/providers/lazy-dialog/shared.types';

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/registry/lazy-dialog/components/ui/dialog';

//#region component

const LazyDialogWithoutCustomProps = (props: DialogContentProps) => {
  //#region render

  return (
    <DialogContent {...props}>
      <DialogHeader>
        <DialogTitle>With props</DialogTitle>
        <DialogDescription>This is a dialog with props</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button>Close</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );

  //#endregion
};

//#endregion

export default LazyDialogWithoutCustomProps;
