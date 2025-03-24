'use client';
import * as React from 'react';
import {
  helperTextEle,
  iconParent,
  icons,
  input,
  inputComponent,
  inputLabel,
  inputParent,
  outlineLabel,
  requiredVisible,
  validationErrorEle,
} from '../ClassName/Input';
import { ErrorIcon, InformationIcon, UserWithCircleIcon } from '@/Icons/Icons';
import { NumberInputProps } from '@/Types/Ui';

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      id,
      name = 'TextInput',
      label,
      height = '46px',
      width = 'auto',
      labelPosition = 'outline',
      placeholder = 'Enter the text here',
      required = false,
      minLength = 1,
      maxLength = 20,
      disabled = false,
      readOnly = false,
      icon = true,
      iconSrc,
      iconPosition = 'left',
      helperText = true,
      helperTextMessage = 'This field is required',
      validation = false,
      onMouseEnter,
      onMouseLeave,
      onChange,
      onBlur,
      onFocus,
      onKeyUp,
      onKeyDown,
      defaultValue,
      error = false,
      errorText,
    },
    ref
  ) => {
    const [focus, setFocus] = React.useState(false);
    const [value, setValue] = React.useState<number | null>(
      defaultValue ? defaultValue : null
    );

    const inputValues = Number(defaultValue || value);

    return (
      <div className={`${inputComponent(labelPosition)}`}>
        <div className={`${inputLabel(labelPosition)}`}>
          {label}
          <span className={`${requiredVisible(required)}`}> *</span>
        </div>
        <div>
          <div
            style={{ width: width, height: height }}
            className={` ${inputParent(focus, error, validation)}`}
          >
            <div className={`${iconParent(iconPosition, icon)}`}>
              {icon && iconPosition === 'left' && (
                <div
                  className={`${icons(icon, iconPosition)}`}
                  style={{
                    width: Number(height.split('p')[0]) < 46 ? height : '46px',
                  }}
                >
                  {iconSrc || <UserWithCircleIcon />}
                </div>
              )}
              <div className="relative">
                <input
                  id={id}
                  name={name}
                  type="number"
                  placeholder={labelPosition !== 'outline' ? placeholder : ''}
                  minLength={minLength}
                  maxLength={maxLength}
                  disabled={disabled}
                  readOnly={readOnly}
                  value={value as number}
                  ref={ref}
                  className={`${input(icon, iconPosition)}`}
                  autoComplete="off"
                  onFocus={(e) => {
                    setFocus(true);
                    if (onFocus) {
                      onFocus(e);
                    }
                  }}
                  onBlur={(e) => {
                    setFocus(false);
                    if (onBlur) {
                      onBlur(e);
                    }
                  }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = parseFloat(e.target.value);
                    setValue(isNaN(value) ? 0 : value);
                    if (onChange) {
                      onChange(e);
                    }
                  }}
                  onKeyUp={onKeyUp}
                  onKeyDown={onKeyDown}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                />
                <div
                  className={`${outlineLabel(focus, labelPosition, inputValues.toString(), error, validation)}`}
                >
                  {label}
                  <span className={`${requiredVisible(required)}`}> *</span>
                </div>
              </div>
              {icon && iconPosition === 'right' && (
                <div
                  className={`${icons(icon, iconPosition)}`}
                  style={{
                    width: Number(height.split('p')[0]) < 46 ? height : '46px',
                  }}
                >
                  {iconSrc || <UserWithCircleIcon />}
                </div>
              )}
            </div>
          </div>
          <div className="relative">
            {error ? (
              <div className={`${validationErrorEle}`}>
                <div>
                  <ErrorIcon />
                </div>
                <div>{errorText}</div>
              </div>
            ) : (
              helperText &&
              inputValues.toString().length === 0 && (
                <div className={`${helperTextEle}`}>
                  <div>
                    <InformationIcon />
                  </div>
                  <div>{helperTextMessage}</div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    );
  }
);
NumberInput.displayName = 'Input';

export { NumberInput };
