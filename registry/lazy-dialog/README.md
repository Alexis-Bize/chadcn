# Lazy Dialog System

A flexible and type-safe lazy dialog system for React applications that supports both dialogs with and without custom props, featuring automatic portal rendering and event-based communication.

## Features

- 🚀 **Lazy Loading**: Dialogs are loaded only when needed
- 🔧 **Type Safety**: Full TypeScript support with proper type inference
- 🎯 **Flexible Props**: Support for dialogs with and without custom props
- 🎨 **Simple API**: Single hook for all dialog operations
- 📦 **Easy Setup**: Simple provider-based architecture
- 🏗️ **Modular Types**: Clean separation of concerns with shared types
- 🌐 **React Portal**: Automatic rendering at document body level
- 📡 **Event System**: Global event-based dialog communication
- 🎭 **Smooth Animations**: Proper cleanup with transition support

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
  const { openDialog, closeDialog, isOpen, dialog } = useLazyDialog();

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
    </div>
  );
}
```

### 3. Event-Based Communication (Optional)

You can also use the global event system for dialog communication:

```tsx
import { dispatchAppEvent } from './modules/events';

// Open dialog without custom props
dispatchAppEvent('dialog:show', {
  type: 'without-custom-props',
});

// Open dialog with custom props
dispatchAppEvent('dialog:show', {
  type: 'with-custom-props',
  props: {
    onConfirm: () => {
      console.log('Confirmed via event!');
    },
  },
});

// Close current dialog
dispatchAppEvent('dialog:close');
```

## API Reference

### `useLazyDialog()`

The single hook that provides access to all dialog functionality.

**Returns:**

- `openDialog(type, props?)`: Function to open a dialog
- `closeDialog()`: Function to close the current dialog
- `isOpen`: Boolean indicating if a dialog is currently open
- `dialog`: Current dialog state (type and props) or null

**Example:**

```tsx
const { openDialog, closeDialog, isOpen, dialog } = useLazyDialog();

// Open dialog with custom props (required)
openDialog('with-custom-props', { onConfirm: handleConfirm });

// Open dialog without custom props (optional)
openDialog('without-custom-props');
openDialog('without-custom-props', { className: 'custom-class' });

// Check current state
console.log(dialog?.type); // 'with-custom-props' | 'without-custom-props' | undefined
console.log(dialog?.props); // props object or empty object
```

### Event System

The system provides a global event system for dialog communication:

```tsx
import { dispatchAppEvent, listenAppEvent, removeAppEvent } from './modules/events';

// Dispatch events
dispatchAppEvent('dialog:show', { type: 'without-custom-props' });
dispatchAppEvent('dialog:close');

// Listen to events (if needed)
const handleDialogShow = event => {
  console.log('Dialog shown:', event.detail);
};

listenAppEvent('dialog:show', handleDialogShow);
removeAppEvent('dialog:show', handleDialogShow);
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

The system uses a modular type architecture with conditional types for proper prop validation:

### Core Types (`shared.types.ts`)

```tsx
export type DialogPropsForType<T extends LazyDialogType> = T extends keyof LazyDialogProps
  ? LazyDialogProps[T] & DialogContentProps
  : DialogContentProps;

export type LazyDialogState<T extends LazyDialogType = LazyDialogType> = {
  type: T;
  props: LazyDialogPropsWithContentProps<T>;
} | null;
```

### Event Types (`modules/events/events.types.ts`)

```tsx
export type AppEvent = 'dialog:show' | 'dialog:close';

type DialogShowEventProps<T extends LazyDialogType> = T extends keyof LazyDialogProps
  ? { type: T; props: LazyDialogProps[T] & DialogContentProps }
  : { type: T; props?: DialogContentProps };

export type AppEventDetail = {
  'dialog:show': DialogShowEventProps<LazyDialogType>;
  'dialog:close': void;
};
```

### Configuration Types (`config/dialogs.types.ts`)

```tsx
export type LazyDialogType = 'with-custom-props' | 'without-custom-props';

export type LazyDialogProps = {
  'with-custom-props': WithPropsProps;
  'without-custom-props': Record<string, never>;
};
```

## Adding New Dialog Types

1. **Update the types** in `config/dialogs.types.ts`:

```tsx
export type LazyDialogType = 'with-custom-props' | 'without-custom-props' | 'your-new-type';

export type LazyDialogProps = {
  'with-custom-props': WithPropsProps;
  'without-custom-props': Record<string, never>;
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

3. **Update the config** in `config/index.ts`:

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
│   ├── index.ts
│   └── dialogs.types.ts
├── hooks/
│   └── use-lazy-dialog.tsx
├── modules/
│   ├── events/
│   │   ├── index.ts
│   │   └── events.types.ts
│   └── helpers/
│       └── environment.ts
├── providers/
│   └── lazy-dialog/
│       ├── index.tsx
│       ├── shared.types.ts
│       └── partials/
│           ├── with-custom-props.tsx
│           └── without-custom-props.tsx
├── examples/
│   └── index.tsx
└── README.md
```

## Example Usage

See `examples/index.tsx` for a complete example demonstrating both hook-based and event-based usage of the lazy dialog system.

## Type Safety

The system provides full TypeScript support:

- Props are type-checked at compile time
- Dialog types are validated
- Hook return types are properly inferred
- Context types are fully typed
- Conditional types ensure proper prop requirements
- Event system maintains type safety with overloaded signatures

## Performance

- Dialogs are loaded lazily using dynamic imports
- Components are only loaded when the dialog is opened
- Unused dialogs are never loaded
- Memory efficient with proper cleanup
- Smooth transitions with proper state management
- React Portal prevents unnecessary re-renders
- Memoized portal creation for optimal performance

## React Portal Benefits

- **Automatic rendering**: No need to manually add dialog components
- **Proper z-index**: Dialogs render at document body level
- **Clean DOM**: No layout interference with parent components
- **Smooth animations**: Portal stays mounted during transitions
- **Memory efficient**: Complete cleanup when dialog closes

## License

MIT License - see the license header in each file for details.
