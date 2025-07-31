# Lazy Dialog System

A flexible and type-safe lazy dialog system for React applications that supports both dialogs with and without custom props.

## Features

- 🚀 **Lazy Loading**: Dialogs are loaded only when needed
- 🔧 **Type Safety**: Full TypeScript support with proper type inference
- 🎯 **Flexible Props**: Support for dialogs with and without custom props
- 🎨 **Simple API**: Single hook for all dialog operations
- 📦 **Easy Setup**: Simple provider-based architecture
- 🏗️ **Modular Types**: Clean separation of concerns with shared types

## Quick Start

### 1. Setup the Provider

Wrap your app with the `LazyDialogProvider`:

```tsx
import { LazyDialogProvider } from './providers/lazy-dialog';

function App() {
  return (
    <LazyDialogProvider>
      <YourApp />
    </LazyDialogProvider>
  );
}
```

### 2. Use the Hook

```tsx
import { useLazyDialog } from './hooks/use-lazy-dialog';

function MyComponent() {
  const { openDialog, closeDialog, isOpen, dialog, LazyDialog } = useLazyDialog();

  const handleOpenWithCustomProps = () => {
    openDialog('with-custom-props', {
      onConfirm: () => {
        console.log('Confirmed!');
        closeDialog();
      },
    });
  };

  const handleOpenWithoutCustomProps = () => {
    openDialog('without-custom-props');
  };

  return (
    <div>
      <button onClick={handleOpenWithCustomProps}>Open with Custom Props</button>
      <button onClick={handleOpenWithoutCustomProps}>Open without Custom Props</button>
      <p>Is open: {isOpen ? 'Yes' : 'No'}</p>
      <p>Current type: {dialog?.type || 'None'}</p>
      {LazyDialog}
    </div>
  );
}
```

## API Reference

### `useLazyDialog()`

The single hook that provides access to all dialog functionality.

**Returns:**

- `openDialog(type, props?)`: Function to open a dialog
- `closeDialog()`: Function to close the current dialog
- `isOpen`: Boolean indicating if a dialog is currently open
- `dialog`: Current dialog state (type and props) or null
- `LazyDialog`: The rendered dialog component

**Example:**

```tsx
const { openDialog, closeDialog, isOpen, dialog, LazyDialog } = useLazyDialog();

// Open dialog with custom props (required)
openDialog('with-custom-props', { onConfirm: handleConfirm });

// Open dialog without custom props (optional)
openDialog('without-custom-props');
openDialog('without-custom-props', { className: 'custom-class' });

// Check current state
console.log(dialog?.type); // 'with-custom-props' | 'without-custom-props' | undefined
console.log(dialog?.props); // props object or empty object
```

## Dialog Types

The system currently supports two dialog types:

### `'with-custom-props'`

A dialog that requires custom props in addition to standard `DialogContentProps`:

```tsx
type Props = {
  onConfirm: () => void;
};
```

### `'without-custom-props'`

A dialog that only uses standard `DialogContentProps` (optional).

## Type System

The system uses a modular type architecture:

### Core Types (`shared.types.ts`)

```tsx
export type LazyDialogPropsForType<T extends LazyDialogType> = T extends keyof LazyDialogProps
  ? LazyDialogProps[T] & DialogContentProps
  : DialogContentProps;

export type LazyDialogState<T extends LazyDialogType = LazyDialogType> = {
  type: T;
  props: LazyDialogPropsWithContentProps<T>;
} | null;
```

### Configuration Types (`config/config.types.ts`)

```tsx
export type LazyDialogType = 'with-custom-props' | 'without-custom-props';

export type LazyDialogProps = {
  'with-custom-props': WithPropsProps;
};
```

## Adding New Dialog Types

1. **Update the types** in `config/config.types.ts`:

```tsx
export type LazyDialogType = 'with-custom-props' | 'without-custom-props' | 'your-new-type';

export type LazyDialogProps = {
  'with-custom-props': WithPropsProps;
  'your-new-type': { message: string; onClose: () => void };
};
```

2. **Create the dialog component** in `partials/`:

```tsx
// partials/your-new-type.tsx
export type Props = {
  message: string;
  onClose: () => void;
};

const YourNewDialog = ({ message, onClose }: Props) => {
  return (
    <DialogContent>
      <p>{message}</p>
      <Button onClick={onClose}>Close</Button>
    </DialogContent>
  );
};

export default YourNewDialog;
```

3. **Update the config** in `config/config.ts`:

```tsx
const lazyDialogs = {
  'with-custom-props': () => import('./partials/with-custom-props'),
  'without-custom-props': () => import('./partials/without-custom-props'),
  'your-new-type': () => import('./partials/your-new-type'),
} as const;
```

## File Structure

```
lazy-dialog/
├── components/
│   └── ui/
│       ├── button.tsx
│       └── dialog.tsx
├── config/
│   ├── config.ts
│   └── config.types.ts
├── hooks/
│   └── use-lazy-dialog.tsx
├── providers/
│   └── lazy-dialog/
│       ├── index.tsx
│       ├── shared.types.ts
│       └── partials/
│           ├── with-custom-props.tsx
│           └── without-custom-props.tsx
├── example-usage.tsx
└── README.md
```

## Example Usage

See `example-usage.tsx` for a complete example demonstrating how to use the lazy dialog system.

## Type Safety

The system provides full TypeScript support:

- Props are type-checked at compile time
- Dialog types are validated
- Hook return types are properly inferred
- Context types are fully typed
- Conditional types ensure proper prop requirements

## Performance

- Dialogs are loaded lazily using dynamic imports
- Components are only loaded when the dialog is opened
- Unused dialogs are never loaded
- Memory efficient with proper cleanup
- Smooth transitions with proper state management

## License

MIT License
