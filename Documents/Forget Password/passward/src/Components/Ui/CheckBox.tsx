'use client';
import React, { useState, useEffect } from 'react';
import { helperTextEle, shadow, validationErrorEle } from '../ClassName/Input';
import { RiInformationFill } from 'react-icons/ri';
import { CheckboxProps, Options } from '@/Types/Ui';
import { ErrorIcon } from '@/Icons/Icons';

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  required = false,
  label,
  height = 'auto',
  width = 'auto',
  disabled = false,
  readOnly = false,
  helperText = true,
  helperTextMessage = 'This field is required field',
  error,
  errorText,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  options,
  isShadow = true,
  labelHelper = false,
  labelHelperType = 'icon',
}: CheckboxProps) => {
  const [values, setValues] = useState<{ label: string; value: string }[]>([]);
  const [checkboxOptions, setCheckboxOptions] = useState<Options[]>([]);

  useEffect(() => {
    setCheckboxOptions(options || []);
  }, [options]);

  useEffect(() => {
    if (checkboxOptions) {
      const selectedOptions = checkboxOptions.map((option) => {
        if (option.checked) {
          return { label: option.optionLabel, value: option.optionValue };
        } else {
          return null;
        }
      });
      if (selectedOptions) {
        setValues(
          (selectedOptions as { label: string; value: string }[]).filter(
            (value) => value
          )
        );
      }
    }
  }, [checkboxOptions]);

  const handleSelect = (field: Options, index: number) => {
    if (checkboxOptions && checkboxOptions.length > 0) {
      const updateData = [...checkboxOptions];
      const updatedData = {
        ...updateData[index],
        ['checked']: !updateData[index].checked,
      };
      updateData[index] = updatedData;
      setCheckboxOptions(updateData);
    }
  };

  return (
    <div className={`pt-2`}>
      <div
        style={{ width: width, minHeight: height }}
        className={`grid grid-rows-[auto,1fr] gap-1 rounded-md p-5 bg-background-color ${isShadow ? shadow() : ''}`}
      >
        <div className=" text-text-color">
          {label}
          {required && <span className="inline-block">*</span>}
        </div>
        <div className="">
          <div className="grid grid-cols-1 gap-2 py-2">
            {([...checkboxOptions] as Options[]).map(
              (field: Options, index) => {
                return (
                  <div
                    key={index}
                    className="grid grid-cols-[auto,1fr] items-center gap-3"
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                  >
                    <input
                      type="checkbox"
                      id={`${id}-${index}`}
                      readOnly={readOnly}
                      disabled={disabled || field.optionDisable}
                      checked={field.checked}
                      title={
                        disabled
                          ? 'Disabled'
                          : field.optionDisable
                            ? 'Disabled'
                            : ''
                      }
                      onFocus={onFocus}
                      onChange={() => {
                        handleSelect(field, index);
                      }}
                    />
                    <div className="flex items-center gap-2">
                      {labelHelper && (
                        <div>
                          {labelHelperType === 'color' && (
                            <div
                              style={{
                                backgroundColor: field.optionHelper as string,
                              }}
                              className={`rounded-[50%] size-[calc(1rem-3px)]`}
                            ></div>
                          )}
                          {labelHelperType === 'image' && (
                            <div className="">{field.optionHelper}</div>
                          )}
                          {labelHelperType === 'icon' && (
                            <div className="">{field.optionHelper}</div>
                          )}
                        </div>
                      )}
                      <div className="text-text-color">{field.optionLabel}</div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
          {/* Note: Validation and helper text */}
          {error ? (
            <div className={`${validationErrorEle}`}>
              <div>
                <ErrorIcon />
              </div>
              <div>{errorText}</div>
            </div>
          ) : helperText && values.toString().length === 0 ? (
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

export default React.memo(Checkbox);
