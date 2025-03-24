'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
  helperTextEle,
  icons,
  input,
  inputComponent,
  inputLabel,
  inputParent,
  requiredVisible,
  shadow,
  validationErrorEle,
} from '../ClassName/Input';
import { BiSolidLockAlt } from 'react-icons/bi';
import {
  DropdownIcon,
  DropdownLabel,
  DropdownOption,
  DropdownOptionParent,
  DropdownOptionsParent,
  iconParentSelf,
  iconsSelf,
  MultiSelectOutlineLabel,
} from '../ClassName/MultiSelect';
import { RiInformationFill } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { IoCloseCircle } from 'react-icons/io5';
import { IoSearchOutline } from 'react-icons/io5';
import { ErrorIcon } from '@/Icons/Icons';
import { MultiSelectInterface } from '@/Types/Ui';

const MultiSelect: React.FC<MultiSelectInterface> = ({
  id,
  required = false,
  label,
  labelPosition = 'left',
  disabled = false,
  icon = true,
  iconSrc,
  height = '46px',
  width = 'auto',
  iconPosition = 'left',
  helperText = true,
  helperTextMessage = 'This field is required field',
  validation = true,
  error = false,
  errorText = '',
  onMouseEnter,
  onMouseLeave,
  defaultValue,
  onFocus,

  options,
  optionsIcon = false,
  optionsIconPosition = 'left',
  search = false,
}: MultiSelectInterface) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const heightRef = useRef<HTMLDivElement>(null);
  const [focus, setFocus] = useState<boolean>(false);
  const [values, setValues] = useState<{ label: string; value: string }[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<
    { label: string; value: string }[] | any
  >([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [showSelectedOption, setShowSelectedOption] = useState<boolean>(true);

  useEffect(() => {
    if (
      defaultValue &&
      options?.some(
        (option) =>
          option.label === defaultValue.label &&
          option.value === defaultValue.value
      )
    ) {
      setValues([defaultValue]);
    }
  }, [defaultValue]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (heightRef.current && heightRef.current.offsetHeight <= 25) {
      setShowSelectedOption(true);
    } else {
      setShowSelectedOption(false);
    }
  }, [values]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
      setFocus(false);
    }
  };

  useEffect(() => {
    if (search) {
      const filteredValues = options?.map((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
          ? option
          : null
      );
      const data = filteredValues?.filter((option) => option);
      setFilteredOptions(data);
    }
  }, [searchValue, search]);

  const addToSelectedValue = (selectOption: {
    label: string;
    value: string;
    optionIcon: any;
  }) => {
    if (
      values.every(
        (selectedOption) =>
          selectedOption.label !== selectOption.label &&
          selectedOption.value !== selectOption.value
      )
    ) {
      setValues((prev) => [...prev, { ...selectOption }]);
    }
  };

  const deleteSeletedValue = (deletedOption: {
    label: string;
    value: string;
    optionIcon: any;
  }) => {
    setValues((prev) => {
      const copyData = [...prev];
      const filteredData = copyData.filter(
        (option) =>
          option.value !== deletedOption.value &&
          option.label !== deletedOption.label
      );
      return filteredData;
    });
  };

  const isSelected = (coption: {
    label: string;
    value: string;
    optionIcon: any;
  }) => {
    const filteredData = values.filter(
      (option) =>
        option.value === coption.value && option.label === coption.label
    );
    if (filteredData.length === 0) {
      return null;
    }
    return filteredData;
  };

  return (
    <div className={`${inputComponent(labelPosition)}`}>
      <div className={`${inputLabel(labelPosition)} `}>
        {label}
        <span className={`${requiredVisible(required)}`}> *</span>
      </div>
      <div className={``}>
        <div
          style={{ width: width, minHeight: height }}
          className={`${inputParent(focus, error, validation)}`}
          ref={dropdownRef}
        >
          <div className={`${iconParentSelf(iconPosition, icon)}  `}>
            {icon && iconPosition === 'left' && (
              <div
                style={{
                  width: Number(height.split('p')[0]) < 46 ? height : '46px',
                }}
                className={`${icons(icon, iconPosition)} `}
              >
                {' '}
                {iconSrc ? iconSrc : <BiSolidLockAlt />}{' '}
              </div>
            )}
            <div>
              {values.length === 0 ? (
                <input
                  type={'text'}
                  onFocus={(e) => {
                    setFocus(!focus);
                    setIsOpen(true);
                    onFocus && onFocus(e);
                  }}
                  id={id}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                  disabled={disabled}
                  readOnly={true}
                  className={`${input(icon, iconPosition)}`}
                  autoComplete={'off'}
                />
              ) : (
                <div className="py-[10px] px-[5px]">
                  <div
                    ref={heightRef}
                    onClick={() => {
                      setIsOpen(true);
                      setFocus(true);
                    }}
                    className={`w-full px-[5px] h-full  flex flex-wrap max-h-[54px] overflow-y-auto gap-1 items-center `}
                  >
                    {isOpen ? (
                      (values || []).map((selectedValue: any, index) => (
                        <div
                          key={index}
                          onClick={(event) => {
                            event.stopPropagation();
                          }}
                          className="bg-primary-color text-primary-in-text-color flex items-center py-[2px] px-1 rounded-[5px] text-[14px] gap-1"
                        >
                          <div>{selectedValue.label}</div>
                          <div
                            className="text-[16px]"
                            onClick={() => {
                              deleteSeletedValue(selectedValue);
                            }}
                          >
                            <IoCloseCircle />
                          </div>
                        </div>
                      ))
                    ) : showSelectedOption ? (
                      (values || []).map((selectedValue: any, index) => (
                        <div
                          key={index}
                          onClick={(event) => {
                            event.stopPropagation();
                          }}
                          className="bg-primary-color text-primary-in-text-color flex items-center py-[2px] px-1 rounded-[5px] text-[14px] gap-1"
                        >
                          <div>{selectedValue.label}</div>
                          <div
                            className="text-[16px]"
                            onClick={() => {
                              deleteSeletedValue(selectedValue);
                            }}
                          >
                            <IoCloseCircle />
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="h-full w-full text-text-color">{`${values.length} Item selected`}</div>
                    )}
                  </div>
                </div>
              )}

              <div
                className={`${MultiSelectOutlineLabel(focus, labelPosition, values, error, validation)}`}
              >
                {label}
                <span className={`${requiredVisible(required)}`}> *</span>
              </div>
            </div>
            <div className={`${iconsSelf(focus, isOpen)}`}>
              {' '}
              <MdKeyboardArrowDown />{' '}
            </div>

            {icon && iconPosition === 'right' && (
              <div
                style={{
                  width: Number(height.split('p')[0]) < 46 ? height : '46px',
                }}
                className={`${icons(icon, iconPosition)}`}
              >
                {' '}
                {iconSrc ? iconSrc : <BiSolidLockAlt />}{' '}
              </div>
            )}
          </div>
          {isOpen && (
            <div className={DropdownOptionsParent()}>
              <div
                className={`duration-1000 translate-x-0 transition-all ease-in-out ${shadow()} ${DropdownOptionParent()}`}
              >
                {search && (
                  <div className="mb-2 grid grid-cols-[auto,1fr] rounded-md border border-border-color overflow-hidden bg-background-color">
                    <div className="text-text-color flex justify-center items-center w-[32px] text-[18px]">
                      <IoSearchOutline />
                    </div>
                    <div className="px-1 py-1 bg-background-color ">
                      <input
                        type="text"
                        placeholder="Search"
                        className="w-full focus:outline-none bg-background-color text-text-color text-[16px]"
                        onChange={(e) => {
                          setSearchValue(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                )}
                {(search ? filteredOptions : options)?.map(
                  (option: any, index: any) => (
                    <div
                      key={index}
                      onClick={() => {
                        addToSelectedValue(option);
                      }}
                      className={`${DropdownOption(optionsIconPosition)} ${isSelected(option) ? 'bg-primary-color text-primary-in-text-color' : null}`}
                    >
                      {optionsIcon && optionsIconPosition === 'left' && (
                        <div className={DropdownIcon()}>
                          {option.optionIcon ? (
                            option.optionIcon
                          ) : (
                            <MdKeyboardArrowDown />
                          )}
                        </div>
                      )}
                      <div className={DropdownLabel()}>{option?.label}</div>
                      {optionsIcon && optionsIconPosition === 'right' && (
                        <div className={DropdownIcon()}>
                          {option.optionIcon ? (
                            option.optionIcon
                          ) : (
                            <MdKeyboardArrowDown />
                          )}
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
        <div className="relative">
          {error ? (
            <div className={`${validationErrorEle}`}>
              <div>
                <ErrorIcon />
              </div>
              <div>{errorText}</div>
            </div>
          ) : helperText && values.length === 0 ? (
            <div className={`${helperTextEle} `}>
              <div>
                <RiInformationFill />
              </div>
              <div>{helperTextMessage}</div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};
export default React.memo(MultiSelect);
