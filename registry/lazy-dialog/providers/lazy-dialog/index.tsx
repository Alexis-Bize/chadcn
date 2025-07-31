/*!
 * Copyright (c) 2025 Alexis Bize
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

'use client';

import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { safeAsync } from '@zeny/safe-async';
import { config } from './config';
import { Dialog } from '@/registry/lazy-dialog/components/ui/dialog';
import type { LazyDialogType } from './config/dialogs.types';

import type {
  LazyDialogPropsForType,
  LazyDialogContextType,
  LazyDialogPropsWithContentProps,
  LazyDialogState,
} from './shared.types';

//#region context

const LazyDialogContext = createContext<LazyDialogContextType | void>(void 0);

//#endregion
//#region component

const LazyDialogProvider = ({ children }: { children: ReactNode }) => {
  //#region states

  const [dialog, setDialog] = useState<LazyDialogState>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [DialogContent, setDialogContent] = useState<React.ReactNode>(null);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  //#endregion
  //#region callbacks

  const openDialog = useCallback(<T extends LazyDialogType>(type: T, props?: LazyDialogPropsForType<T>) => {
    setDialog({ type, props: props as LazyDialogPropsWithContentProps<T> });
  }, []);

  const closeDialog = useCallback(() => {
    setIsClosing(true);
    setDialog(null);
  }, []);

  const lazyLoadDialog = useCallback(async () => {
    if (isLoading === true || dialog === null) {
      return;
    }

    setIsLoading(true);
    const [err, resp] = await safeAsync(config.lazyDialogs[dialog.type]());
    setIsLoading(false);

    if (err !== null) {
      setDialogContent(null);
      console.error(err);
      return;
    }

    const Content = resp.default;
    // @ts-expect-error - Generic lazy loading
    setDialogContent(<Content {...dialog.props} />);
  }, [isLoading, dialog]);

  //#endregion
  //#region effects

  useEffect(() => {
    if (dialog !== null) {
      lazyLoadDialog();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialog]);

  useEffect(() => {
    if (dialog === null && DialogContent !== null && isClosing === true) {
      const handleTransitionEnd = () => {
        setDialogContent(null);
        setIsClosing(false);
      };

      const dialogElement = document.querySelector('[data-state="closed"]');
      if (dialogElement !== null) {
        dialogElement.addEventListener('transitionend', handleTransitionEnd, { once: true });
        return () => dialogElement.removeEventListener('transitionend', handleTransitionEnd);
      }

      // Fallback
      setDialogContent(null);
      setIsClosing(false);
    }
  }, [dialog, DialogContent, isClosing]);

  //#endregion
  //#region memos

  const LazyDialog = useMemo(
    () => (
      <Dialog open={dialog !== null} onOpenChange={closeDialog}>
        {DialogContent}
      </Dialog>
    ),
    [DialogContent, dialog, closeDialog],
  );

  const contextMemorizedValue = useMemo<LazyDialogContextType>(
    () => ({
      dialog,
      openDialog,
      closeDialog,
      isOpen: dialog !== null,
      LazyDialog,
    }),
    [dialog, openDialog, LazyDialog, closeDialog],
  );

  //#endregion
  //#region render

  return <LazyDialogContext.Provider value={contextMemorizedValue}>{children}</LazyDialogContext.Provider>;

  //#endregion
};

//#endregion

export { LazyDialogProvider, LazyDialogContext };
