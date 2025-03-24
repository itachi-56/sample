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
import { TextAreaProps } from '@/Types/Ui';

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      id,
      name = 'TextArea',
      label = '',
      height = '',
      width = 'auto',
      labelPosition = 'outline',
      placeholder = 'Enter your text here',
      required = false,
      minLength = 1,
      maxLength = 500,
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
      rows = 4,
    },
    ref
  ) => {
    const [focus, setFocus] = React.useState(false);
    const [value, setValue] = React.useState<string>(
      defaultValue ? defaultValue.toString() : ''
    );

    React.useEffect(() => {
      setValue(defaultValue ? defaultValue.toString() : '');
    }, [defaultValue]);

    return (
      <div className={`${inputComponent(labelPosition)}`}>
        <div className={`${inputLabel(labelPosition)}`}>
          {label}
          <span className={`${requiredVisible(required)}`}> *</span>
        </div>
        <div>
          <div
            style={{ width: width }}
            className={`${inputParent(focus, error, validation)}`}
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
              <div className="relative flex-grow">
                <textarea
                  style={{ height: height }}
                  id={id}
                  name={name}
                  placeholder={labelPosition !== 'outline' ? placeholder : ''}
                  minLength={minLength}
                  maxLength={maxLength}
                  disabled={disabled}
                  readOnly={readOnly}
                  value={value}
                  ref={ref}
                  rows={rows}
                  className={`${input(icon, iconPosition)} resize-y`}
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
                  <div className="">{helperTextMessage}</div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

// Changed from named export to default export
export default TextArea;
