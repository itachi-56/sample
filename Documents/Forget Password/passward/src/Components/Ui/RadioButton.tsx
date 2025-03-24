'use client';
import React, { useState } from 'react';
import {
  helperTextEle,
  requiredVisible,
  shadow,
  validationErrorEle,
} from '../ClassName/Input';
import { RiInformationFill } from 'react-icons/ri';
import { ErrorIcon } from '@/Icons/Icons';
import { RadioButtonOptions, RadioButtonProps } from '@/Types/Ui';

const RadioButton: React.FC<RadioButtonProps> = ({
  name,
  required = false,
  label,
  height = 'auto',
  width = 'auto',
  disabled = false,
  read_only = false,
  helper_text = true,
  helper_text_message = 'This field is required field',
  error,
  values = "",
  errorText,
  onMouseEnter,
  onMouseLeave,
  onChange,
  onBlur,
  onFocus,
  options,
  options_flow = 'vertical',
  optionsPerRow = 3,
  isShadow = true,
  labelHelper = false,
  labelHelperType = 'icon',
}: RadioButtonProps) => {
  const [value, setValue] = useState<string>('');

  return (
    <div className={`pt-2 `}>
      <div
        style={{ width: width, minHeight: height }}
        className={`grid grid-rows-[auto,1fr] gap-1 rounded-md  ${isShadow ? shadow() : ''}`}
      >
        <div className=" text-color-input-label-font-color font-input-label-font-weight text-input-label-font-size">
          {label}
          <span className={`${requiredVisible(required)}`}> *</span>
        </div>
        <div className="">
          <div
            className={`grid ${options_flow === 'vertical' ? 'grid-cols-1' : `grid-cols-${optionsPerRow} justify-around`} gap-3 py-2`}
          >
            {(options as RadioButtonOptions[]).map((filed, index) => (
              <div
                key={index}
                className="grid grid-cols-[auto,1fr] items-center gap-3"
              >
                <input
                  type="radio"
                  id={filed.optionValue as string}
                  name={name}
                  checked={filed.optionValue === value || values ? true : false }
                  readOnly={read_only}
                  required={required}
                  disabled={
                    disabled ? true : filed.optionDisable ? true : false
                  }
                  title={
                    disabled
                      ? 'Disabled'
                      : filed.optionDisable
                        ? 'Disabled'
                        : ''
                  }
                  onFocus={(e) => {
                    if (onFocus) {
                      onFocus(e);
                    }
                  }}
                  onBlur={(e) => {
                    if (onBlur) {
                      onBlur(e);
                    }
                  }}
                  onChange={(e) => {
                    setValue(e.target.id);
                    if (onChange) {
                      onChange(e);
                    }
                  }}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                />
                <div className="flex items-center gap-2">
                  {labelHelper && (
                    <div>
                      {labelHelperType === 'color' && (
                        <div
                          style={{
                            backgroundColor: filed.optionHelper as string,
                          }}
                          className={`rounded-[50%] size-[calc(1rem-3px)]`}
                        ></div>
                      )}
                      {labelHelperType === 'image' && (
                        <div className="">{filed.optionHelper}</div>
                      )}
                      {labelHelperType === 'icon' && (
                        <div className="">{filed.optionHelper}</div>
                      )}
                    </div>
                  )}
                  <label
                    htmlFor={filed.optionValue as string}
                    className="text-color-input-value-font-color text-input-value-font-size font-input-value-font-weight tracking-wide"
                  >
                    {filed.optionLabel}
                  </label>
                </div>
              </div>
            ))}
          </div>
          {error ? (
            <div className={`${validationErrorEle}`}>
              <div>
                <ErrorIcon />
              </div>
              <div>{errorText}</div>
            </div>
          ) : helper_text && value.toString().length === 0 ? (
            <div className={`${helperTextEle} `}>
              <div>
                <RiInformationFill />
              </div>
              <div>{helper_text_message}</div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(RadioButton);
