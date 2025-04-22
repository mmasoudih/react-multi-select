/**
 * Represents an option in the MultiSelect component
 */
export interface Option {
  /** Display label for the option */
  label: string;
  /** Unique value for the option */
  value: string;
  /** Optional emoji to display with the option */
  emoji?: string;
}

/**
 * Props for the MultiSelect component
 */
export interface MultiSelectProps {
  /** Array of options to display in the dropdown */
  options: Option[];
  /** Placeholder text to show when no options are selected */
  placeholder?: string;
  /** Currently selected options */
  value?: Option[];
  /** Callback function when selection changes */
  onChange?: (selected: Option[]) => void;
  /** Additional CSS class name */
  className?: string;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Maximum number of options that can be selected */
  maxSelections?: number;
  /** Whether to allow creating new options */
  allowCreate?: boolean;
  /** Custom filter function for options */
  filterOption?: (option: Option, searchValue: string) => boolean;
}
