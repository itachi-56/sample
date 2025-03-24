'use client';

import * as React from 'react';
import { Search } from 'lucide-react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { inputLabel, requiredVisible } from '../ClassName/Input';
import { DropdownSearchProps } from '@/Types/Ui';

const DropdownSearch = React.forwardRef<HTMLInputElement, DropdownSearchProps>(
  ({
    name,
    required = false,
    label,
    height = '35px',
    width = '100%',
    labelPosition = 'top',
    disabled = false,
    search = false,
    options = [],
    value,
    onChange,
    error = false,
    errorText,
    helperText = true,
    helperTextMessage = 'Please select an option',
  }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');
    const selectRef = React.useRef<HTMLDivElement>(null);

    const filteredOptions = React.useMemo(() => {
      if (!searchValue) return options;
      return options.filter((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      );
    }, [options, searchValue]);

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          selectRef.current &&
          !selectRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          setSearchValue('');
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (option:option) => {
      if (onChange) {
        onChange(name, option.value);
      }
      setIsOpen(false);
      setSearchValue('');
    };

    return (
      <div className="w-full" ref={selectRef}>
        <div className="flex flex-col gap-1.5">
          {label && (
            <div className={`${inputLabel(labelPosition)} `}>
              {label}
              <span className={`${requiredVisible(required)}`}> *</span>
            </div>
          )}
          <div className="relative">
            <button
              type="button"
              onClick={() => !disabled && setIsOpen(!isOpen)}
              className={`
                relative w-full rounded-md border border-gray-200 px-3 text-left text-sm
                ${disabled ? 'bg-gray-50 text-gray-500' : 'bg-white text-gray-900'}
                ${error ? 'border-red-500' : 'hover:border-gray-300'}
                ${isOpen ? 'ring-1 ring-gray-300' : ''}
              `}
              style={{ height, width }}
            >
              <span className={value ? 'text-gray-900' : 'text-gray-400'}>
                {value ? value.label : 'Select Form name'}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                <MdKeyboardArrowDown
                  className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </span>
            </button>

            {isOpen && (
              <div className="absolute z-10 mt-1 w-[365px] rounded-lg  bg-white shadow-lg border border-gray-100">
                {search && (
                  <div className="p-2 border-b   border-gray-100">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        className="w-full pl-9 pr-3 py-1.5 focus:outline-none 
                        text-sm border-none rounded-md 
                         "
                        placeholder="Search for Form Name"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                      />
                    </div>
                  </div>
                )}
                <ul className="max-h-60 overflow-auto py-1">
                  {filteredOptions.map((option, index) => (
                    <li
                      key={index}
                      className={`
                        px-3 py-2 text-sm cursor-pointer text-gray-600
                        ${
                          option.value === value?.value
                            ? 'bg-gray-50'
                            : 'hover:bg-gray-50'
                        }
                      `}
                      onClick={() => handleSelect(option)}
                    >
                      {option.label}
                    </li>
                  ))}
                  {filteredOptions.length === 0 && (
                    <li className="px-3 py-2 text-sm text-gray-500">
                      No options found
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        {error && errorText && (
          <p className="mt-1 text-sm text-red-500">{errorText}</p>
        )}

        {helperText && !value && !error && (
          <p className="mt-1 text-sm text-gray-500 hidden">
            {helperTextMessage}
          </p>
        )}
      </div>
    );
  }
);

DropdownSearch.displayName = 'DropdownSearch';

export default DropdownSearch;
