import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Option } from '@/types/multi-select';

interface UseMultiSelectProps {
  options: Option[];
  value?: Option[];
  onChange?: (selected: Option[]) => void;
  maxSelections?: number;
  allowCreate?: boolean;
  filterOption?: (option: Option, searchValue: string) => boolean;
}

export function useMultiSelect({
  options,
  value = [],
  onChange,
  maxSelections,
  allowCreate = true,
  filterOption,
}: UseMultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option[]>(value);
  const [searchValue, setSearchValue] = useState('');
  const [customOptions, setCustomOptions] = useState<Option[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync with external value changes
  useEffect(() => {
    setSelected(value);
  }, [value]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleSelect = useCallback(
    (option: Option) => {
      if (
        maxSelections &&
        selected.length >= maxSelections &&
        !selected.some(o => o.value === option.value)
      ) {
        return;
      }

      const newSelected = selected.some(o => o.value === option.value)
        ? selected.filter(o => o.value !== option.value)
        : [...selected, option];

      setSelected(newSelected);
      onChange?.(newSelected);
      setSearchValue('');
    },
    [selected, onChange, maxSelections]
  );

  const removeSelected = useCallback(
    (option: Option) => {
      const newSelected = selected.filter(o => o.value !== option.value);
      setSelected(newSelected);
      onChange?.(newSelected);
    },
    [selected, onChange]
  );

  const handleAddNewOption = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!allowCreate) return;

      if (e.key === 'Enter' && searchValue.trim()) {
        if (maxSelections && selected.length >= maxSelections) {
          return;
        }

        const newOption = {
          label: searchValue,
          value: searchValue.toLowerCase().replace(/\s+/g, '-'),
        };

        const optionExists = [...options, ...customOptions].some(
          option => option.value === newOption.value
        );

        if (!optionExists) {
          setCustomOptions(prev => [...prev, newOption]);
        }

        const newSelected = [...selected, newOption];
        setSelected(newSelected);
        onChange?.(newSelected);
        setSearchValue('');
        e.preventDefault();
      }
    },
    [searchValue, options, customOptions, selected, onChange, maxSelections, allowCreate]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && searchValue === '' && selected.length > 0) {
        const newSelected = selected.slice(0, -1);
        setSelected(newSelected);
        onChange?.(newSelected);
      }
    },
    [searchValue, selected, onChange]
  );

  const getFilteredOptions = useCallback(() => {
    const allOptions = [...options, ...customOptions];
    return allOptions.filter(option => {
      if (selected.some(s => s.value === option.value)) return false;
      if (filterOption) return filterOption(option, searchValue);
      return option.label.toLowerCase().includes(searchValue.toLowerCase());
    });
  }, [options, customOptions, selected, searchValue, filterOption]);

  return {
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
    customOptions,
  };
}
