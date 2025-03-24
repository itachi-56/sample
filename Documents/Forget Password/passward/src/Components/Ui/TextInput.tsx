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
import { TextInputProps } from '@/Types/Ui';

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      type = 'text',
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
      defaultValue = null,
      error = false,
      errorText,
    },
    ref
  ) => {
    const [focus, setFocus] = React.useState(false);
    const [value, setValue] = React.useState<any>(
      defaultValue ? defaultValue.toString() : ''
    );

    React.useEffect(() => {
      setValue(
        defaultValue ? defaultValue.toString() : defaultValue === 0 ? '0' : ''
      );
    }, [defaultValue]);

    return (
      <div className={`${inputComponent(labelPosition)} `}>
        <div className={`${inputLabel(labelPosition)}`}>
          {label}
          <span className={`${requiredVisible(required)}`}> *</span>
        </div>
        <div>
          <div
            style={{ width: width, height: height }}
            className={` ${inputParent(focus, error, validation)} `}
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
                  className={`${outlineLabel(focus, labelPosition, value, error, validation)}`}
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
              value.length === 0 && (
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
TextInput.displayName = 'Input';

export { TextInput };
