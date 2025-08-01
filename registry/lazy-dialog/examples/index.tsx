/*!
 * Copyright (c) 2025 Alexis Bize
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

'use client';

import { Button } from '../../../app/components/ui/button';
import { useLazyDialog } from '../hooks/use-lazy-dialog';
import { dispatchAppEvent } from '../modules/events';
import { LazyDialogProvider } from '../providers/lazy-dialog';

//#region component

const LazyDialogExample = () => {
  //#region hooks

  const { openDialog, closeDialog, isOpen, dialog } = useLazyDialog();

  //#endregion
  //#region handlers

  const handleOpenWithProps = () => {
    openDialog('with-custom-props', {
      showCloseButton: false,
      onConfirm: () => {
        alert('Confirmed!');
        closeDialog();
      },
    });
  };

  const handleOpenWithoutProps = () => {
    openDialog('without-custom-props');
  };

  const handleOpenWithoutPropsEventBased = () => {
    dispatchAppEvent('dialog:show', {
      type: 'without-custom-props',
    });
  };

  const handleOpenWithPropsEventBased = () => {
    dispatchAppEvent('dialog:show', {
      type: 'with-custom-props',
      props: {
        onConfirm: () => {
          alert('Confirmed via event!');
          closeDialog();
        },
      },
    });
  };

  //#endregion
  //#region render

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-bold">Lazy Dialog Examples</h2>
      <div className="space-x-2">
        <Button onClick={handleOpenWithProps}>Open Dialog with Props</Button>
        <Button onClick={handleOpenWithoutProps}>Open Dialog without Props</Button>
      </div>
      <div className="space-x-2">
        <Button onClick={handleOpenWithoutPropsEventBased}>Open Dialog without Props (Event Based)</Button>
        <Button onClick={handleOpenWithPropsEventBased}>Open Dialog with Props (Event Based)</Button>
      </div>
      <div className="text-sm text-gray-600">
        <p>Current dialog type: {dialog?.type || 'None'}</p>
        <p>Is dialog open: {isOpen ? 'Yes' : 'No'}</p>
        <p>Has props: {dialog?.props && Object.keys(dialog.props).length > 0 ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );

  //#endregion
};

const App = () => (
  <LazyDialogProvider>
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="mb-8 text-3xl font-bold">Lazy Dialog System Demo</h1>
        <LazyDialogExample />
      </div>
    </div>
  </LazyDialogProvider>
);

//#endregion

export default App;
