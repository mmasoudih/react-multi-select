import React, { useRef } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { MultiSelectProps } from '../../types/multi-select';
import { useMultiSelect } from '../../hooks/useMultiSelect';
import './MultiSelect.scss';

/**
 * Represents an option in the MultiSelect component
 *
 * @interface Option
 * @property {string} label - Display label for the option
 * @property {string} value - Unique value for the option
 * @property {string} [emoji] - Optional emoji to display with the option
 */

/**
 * A reusable multi-select component with search and custom option creation capabilities.
 *
 * @example
 * ```tsx
 * <MultiSelect
 *   options={[
 *     { label: "React", value: "react", emoji: "⚛️" },
 *     { label: "TypeScript", value: "typescript", emoji: "📘" }
 *   ]}
 *   value={selectedOptions}
 *   onChange={setSelectedOptions}
 *   placeholder="Select technologies..."
 * />
 * ```
 *
 * @example
 * ```tsx
 * // With custom option creation
 * <MultiSelect
 *   options={options}
 *   value={selectedOptions}
 *   onChange={setSelectedOptions}
 *   allowCreate={true}
 *   maxSelections={5}
 * />
 * ```
 *
 * @param {Option[]} options - Array of available options
 * @param {string} [placeholder="Select..."] - Placeholder text when no options are selected
 * @param {Option[]} [value=[]] - Currently selected options
 * @param {(selected: Option[]) => void} [onChange] - Callback when selection changes
 * @param {string} [className=""] - Additional CSS class name
 * @param {boolean} [disabled=false] - Whether the component is disabled
 * @param {number} [maxSelections] - Maximum number of options that can be selected
 * @param {boolean} [allowCreate=true] - Whether to allow creating new options
 * @param {(option: Option, searchValue: string) => boolean} [filterOption] - Custom filter function for options
 *
 * @returns {JSX.Element} A multi-select component
 */
const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  placeholder = 'Select...',
  value = [],
  onChange,
  className = '',
  disabled = false,
  maxSelections,
  allowCreate = true,
  filterOption,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    isOpen,
    setIsOpen,
    selected,
    searchValue,
    setSearchValue,
    dropdownRef,
    toggleSelect,
    removeSelected,
    handleAddNewOption,
    handleKeyDown,
    getFilteredOptions,
  } = useMultiSelect({
    options,
    value,
    onChange,
    maxSelections,
    allowCreate,
    filterOption,
  });

  const handleControlClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      inputRef.current?.focus();
    }
  };

  const filteredOptions = getFilteredOptions();

  return (
    <div
      className={`multi-select ${className} ${disabled ? 'disabled' : ''}`}
      ref={dropdownRef}
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-controls="multi-select-options"
    >
      <div
        className="multi-select__control"
        onClick={handleControlClick}
        tabIndex={disabled ? -1 : 0}
      >
        <div className="multi-select__selected">
          {selected.map(option => (
            <span
              key={option.value}
              className="multi-select__selected-item"
              role="option"
              aria-selected="true"
            >
              {option.emoji} {option.label}
              <X
                size={14}
                onClick={e => {
                  e.stopPropagation();
                  removeSelected(option);
                }}
                aria-label={`Remove ${option.label}`}
              />
            </span>
          ))}
          <input
            ref={inputRef}
            type="text"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            onKeyDown={e => {
              handleKeyDown(e);
              handleAddNewOption(e);
            }}
            placeholder={selected.length === 0 ? placeholder : ''}
            className="multi-select__input"
            disabled={disabled}
            aria-label="Search options"
          />
        </div>
        <ChevronDown
          size={16}
          className={`multi-select__chevron ${isOpen ? 'open' : ''}`}
          aria-hidden="true"
        />
      </div>
      {isOpen && (
        <div className="multi-select__dropdown" id="multi-select-options" role="listbox">
          <div className="multi-select__options">
            {filteredOptions.map(option => (
              <div
                key={option.value}
                className="multi-select__option"
                onClick={() => toggleSelect(option)}
                role="option"
                aria-selected={selected.some(s => s.value === option.value)}
              >
                <span>
                  {option.emoji} {option.label}
                </span>
              </div>
            ))}
            {filteredOptions.length === 0 && searchValue.trim() && allowCreate && (
              <div className="multi-select__no-options">
                Press Enter to add &quot;{searchValue}&quot;
              </div>
            )}
            {filteredOptions.length === 0 && !searchValue.trim() && (
              <div className="multi-select__no-options">No options found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
