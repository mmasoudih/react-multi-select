# React Multi-Select Component

A modern, customizable multi-select component built with React, TypeScript, and Vite. This component provides a rich user interface for selecting multiple options with features like search, custom option creation, and keyboard navigation.

## Features

- 🔍 Search functionality to filter options
- ✨ Custom option creation support
- ⌨️ Keyboard navigation
- 🎨 Customizable styling
- 📱 Responsive design
- 🧩 TypeScript support
- 🎯 Maximum selection limit
- 🚫 Disabled state support

## Installation

```bash
# Clone the repository
git clone https://github.com/mmasoudih/react-multi-select.git

# Navigate to the project directory
cd react-multi-select

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

## Usage

```tsx
import { MultiSelect } from './components/MultiSelect';

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

function App() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  return (
    <MultiSelect
      options={options}
      value={selectedValues}
      onChange={setSelectedValues}
      placeholder="Select options..."
      maxSelections={5}
      allowCreate={true}
    />
  );
}
```

## Props

| Prop            | Type                                          | Default       | Description                          |
| --------------- | --------------------------------------------- | ------------- | ------------------------------------ |
| `options`       | `Option[]`                                    | `[]`          | Array of selectable options          |
| `value`         | `string[]`                                    | `[]`          | Array of selected option values      |
| `onChange`      | `(values: string[]) => void`                  | -             | Callback when selection changes      |
| `placeholder`   | `string`                                      | `'Select...'` | Placeholder text                     |
| `className`     | `string`                                      | -             | Additional CSS class name            |
| `disabled`      | `boolean`                                     | `false`       | Disable the component                |
| `maxSelections` | `number`                                      | -             | Maximum number of selections allowed |
| `allowCreate`   | `boolean`                                     | `false`       | Allow creating new options           |
| `filterFn`      | `(option: Option, search: string) => boolean` | -             | Custom filter function               |

## Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues
- `pnpm format` - Format code with Prettier
- `pnpm preview` - Preview production build
- `pnpm docs` - Generate documentation

### Project Structure

```
src/
├── components/
│   └── MultiSelect/
│       ├── MultiSelect.tsx
│       └── MultiSelect.module.scss
├── hooks/
│   └── useMultiSelect.ts
├── types/
│   └── multi-select.ts
├── App.tsx
└── main.tsx
```

## Technologies Used

- React 19
- TypeScript
- Vite
- SCSS
- Lucide React (for icons)
- ESLint & Prettier (for code quality)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Lucide React](https://lucide.dev/) for the beautiful icons
- [Vite](https://vitejs.dev/) for the amazing build tool
- [React](https://react.dev/) for the UI library
