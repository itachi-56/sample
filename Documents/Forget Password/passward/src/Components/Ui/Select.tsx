'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
  helperTextEle,
  icons,
  input,
  inputComponent,
  inputLabel,
  inputParent,
  outlineLabel,
  requiredVisible,
  shadow,
  validationErrorEle,
} from '../ClassName/Input';
import {
  DropdownIcon,
  DropdownLabel,
  DropdownOption,
  DropdownOptionParent,
  DropdownOptionsParent,
  DropdownOverflow,
  iconParentSelf,
  iconsSelf,
} from '../ClassName/Select';
import { RiInformationFill } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { ErrorIcon, UserWithCircleIcon } from '@/Icons/Icons';
import { SelectInterface } from '@/Types/Ui';

const Select: React.FC<SelectInterface> = ({
  id,
  name,
  required = false,
  label,
  height = '46px',
  placeholder = 'Enter the text here',
  width = 'auto',
  labelPosition = 'outline',
  disabled = false,
  read_only = true,
  icon = false,
  iconSrc,
  iconPosition = 'left',
  helperText = true,
  helperTextMessage = 'This field is required field',
  validation = true,
  onMouseEnter,
  onMouseLeave,
  defaultValue,
  onFocus,
  onSelect,
  onBlur,
  error = false,
  errorText,
  options,
  optionsIcon = false,
  optionsIconPosition = 'left',
  search = false,
}: SelectInterface) => {
  const [focus, setFocus] = useState<boolean>(false);
  const [value, setValue] = useState<{ label: string; value: string }>({
    label: '',
    value: '',
  });
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const selectDropdownRef = useRef<HTMLDivElement>(null);
  const optionBox = useRef<HTMLDivElement>(null);
  const inputBoxRef = useRef<HTMLDivElement>(null);
  const [filteredOptions, setFilteredOptions] = useState<
    { label: string; value: string }[] | any
  >([]);

  useEffect(() => {
    if (optionBox.current && inputBoxRef.current) {
      const input = inputBoxRef.current.getBoundingClientRect();
      const rect = optionBox.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      setIsOverflowing(viewportHeight-input.bottom < rect.bottom-rect.top);
    }
  }, [focus,isOpen]);


  useEffect(() => {
    if (onSelect && value.value && value.label) {
      onSelect(value);
    }
  }, [value]);

  const inputValues = defaultValue || value.value;

  useEffect(() => {
    if (
      defaultValue &&
      options?.some((option) => option.value === defaultValue)
    ) {
      setValue(defaultValue as any);
    }
  }, [defaultValue]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectDropdownRef.current &&
      selectDropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(true);
      setFocus(true);
    } else {
      setIsOpen(false);
    }
    if (selectDropdownRef.current) {
      setFocus(false);
    }
  };  

  useEffect(() => {
    if (focus && isOpen) {
      onFocus && onFocus(value);
    } else {
      onBlur && onBlur(value);
    }
  }, [focus, isOpen]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (search) {
      const filteredValues = options?.map((option) =>
        option.label.toLowerCase().includes(String(inputValues).toLowerCase())
          ? option
          : null
      );
      const data = filteredValues?.filter((option) => option);
      setFilteredOptions(data);
    }
  }, [value, search]);

  return (
    <div className={`${inputComponent(labelPosition)}`}>
      <div className={`${inputLabel(labelPosition)} `}>
        {label}
        <span className={`${requiredVisible(required)}`}> *</span>
      </div>
      <div className="" ref={selectDropdownRef}>
        <div
          ref={selectDropdownRef}
          className={`flex ${isOverflowing ? 'flex-col-reverse' : ' flex-col'}`}
        >
          <div
            ref={inputBoxRef}
            onClick={()=>{setFocus(!focus); setIsOpen(true);}}
            style={{ width: width, height: height }}
            className={`${inputParent(focus, error, validation)}`}
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
                  {iconSrc || <UserWithCircleIcon />}{' '}
                </div>
              )}
              <div className="relative ">
                <input
                  type={'text'}
                  name={name}
                  placeholder={labelPosition !== 'outline' ? placeholder : ''}
                  onFocus={(e:any) => {
                    onFocus && onFocus(e);
                  }}
                  id={id}
                  value={String(inputValues)}
                  onChange={(e) => {
                    setValue((prev) => ({
                      ...prev,
                      ['label']: e.target.value,
                      ['value']: '',
                    }));
                  }}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                  disabled={disabled}
                  readOnly={read_only}
                  className={`${input(icon, iconPosition, Number(width.split('p')[0]))} z-50`}
                  autoComplete={'off'}
                />
                <div
                  onClick={() => {
                    setFocus(!focus);
                  }}
                  className={`${outlineLabel(focus, labelPosition, inputValues?.toString(), error, validation)}`}
                >
                  {label}
                  <span className={`${requiredVisible(required)}`}> *</span>
                </div>
              </div>
              <div
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
                style={{
                  width:
                    Number(height.split('p')[0]) < 46
                      ? Number(width.split('p')[0]) < 100
                        ? '22px'
                        : height
                      : '46px',
                }}
                className={`${iconsSelf(focus, isOpen)} text-hdd-selected-text-remove-icon-color`}
              >
                {' '}
                <MdKeyboardArrowDown />{' '}
              </div>

              {icon && iconPosition === 'right' && (
                <div className={`${icons(icon, iconPosition)}`}>
                  {' '}
                  {iconSrc || <UserWithCircleIcon />}{' '}
                </div>
              )}
            </div>
          </div>
          {isOpen && (
            <div className={DropdownOptionsParent()}>
              <div
                ref={optionBox}
                className={`${shadow()} ${DropdownOptionParent(isOverflowing, isOpen)} ${DropdownOverflow(search ? filteredOptions.length : options?.length)}`}
              >
                {(search ? filteredOptions : options)?.map(
                  (option: any, index: any) => (
                    <div
                      key={index}
                      onClick={() => {
                        setValue(option);
                        setIsOpen(false);
                      }}
                      className={DropdownOption(
                        optionsIconPosition,
                        option?.label === value.label &&
                          option.value === value.value
                      )}
                    >
                      {optionsIcon && optionsIconPosition === 'left' && (
                        <div className={DropdownIcon()}>
                          {option.option_icon ? (
                            option.option_icon
                          ) : (
                            <MdKeyboardArrowDown />
                          )}
                        </div>
                      )}
                      <div
                        title={option?.label}
                        className={  DropdownLabel(
                          option?.label === value.label &&
                            option.value === value.value
                        )}
                      >
                        {option?.label}
                      </div>
                      {optionsIcon && optionsIconPosition === 'right' && (
                        <div className={DropdownIcon()}>
                          {option.option_icon ? (
                            option.option_icon
                          ) : (
                            <MdKeyboardArrowDown className="" />
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
          ) : helperText && (value?.value).toString().length === 0 ? (
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

export default React.memo(Select);
