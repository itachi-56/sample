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
import { EmailInputProps } from '@/Types/Ui';

const EmailInput = React.forwardRef<HTMLInputElement, EmailInputProps>(
  (
    {
      type,
      id,
      name = 'EmailInput',
      label,
      height = '46px',
      width = 'auto',
      labelPosition = 'outline',
      placeholder = 'Enter the email here',
      required = false,
      minLength = 1,
      maxLength = 100,
      disabled = false,
      readOnly = false,
      icon = false,
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
    const [value, setValue] = React.useState<string>(
      defaultValue ? defaultValue : ''
    );

    const inputValues = defaultValue || value;

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
                  type={type}
                  placeholder={labelPosition !== 'outline' ? placeholder : ''}
                  minLength={minLength}
                  maxLength={maxLength}
                  disabled={disabled}
                  readOnly={readOnly}
                  value={value}
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
                  onChange={(e) => {
                    setValue(e.target.value);
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
                  onClick={() => {
                    setFocus(!focus);
                  }}
                  className={`${outlineLabel(focus, labelPosition, inputValues, error, validation)}`}
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
              inputValues.length === 0 && (
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
EmailInput.displayName = 'Input';

export { EmailInput };
