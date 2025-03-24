"use client";
import React, { useState, useEffect } from 'react';
import {
  helperTextEle,
  icons,
  input,
  inputComponent,
  inputLabel,
  inputParent,
  outlineLabel,
  requiredVisible,
  validationErrorEle,
} from '../ClassName/Input';
import { BiSolidLockAlt } from 'react-icons/bi';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { iconParentSelf, iconsSelf } from '../ClassName/PasswordInput';
import { ErrorIcon, InformationIcon } from '@/Icons/Icons';
import { PasswordInputProps } from '@/Types/Ui';

const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  name,
  required = false,
  label,
  height = '46px',
  width = 'auto',
  labelPosition = 'left',
  min_length = 1,
  max_length = 20,
  disabled = false,
  read_only = false,
  icon = false,
  icon_src,
  icon_position = 'left',
  helperText = true,
  helperTextMessage = 'This field is required field',
  defaultValue,
  onMouseEnter,
  onMouseLeave,
  onChange,
  onBlur,
  onFocus,
  onKeyUp,
  onKeyDown,
  validation = false,
  error = false,
  errorText,
  show_password = false,
  show_eye_icon = true,
}: PasswordInputProps) => {
  const [focus, setFocus] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [showPassword, setShowPassword] = useState(show_password);

  const inputValues = defaultValue || value;

  useEffect(() => {
    setShowPassword(show_password);
  }, [show_password]);

  useEffect(() => {
    const currentInputValue = (document.getElementById(id) as HTMLInputElement)
      .value;
    setValue(currentInputValue);
  }, [focus]);

  return (
    <div className={`${inputComponent(labelPosition)} `}>
      <div className={`${inputLabel(labelPosition)} `}>
        {label}
        <span className={`${requiredVisible(required)}`}> *</span>
      </div>
      <div>
        <div
          style={{ width: width, height: height }}
          className={`${inputParent(focus, error, validation)} `}
        >
          <div
            className={`${iconParentSelf(icon_position, icon, show_eye_icon)}  `}
          >
            {icon && icon_position === 'left' && (
              <div
                style={{
                  width: Number(height.split('p')[0]) < 46 ? height : '46px',
                }}
                className={`${icons(icon, icon_position)}`}
              >
                {' '}
                {icon_src ? icon_src : <BiSolidLockAlt />}{' '}
              </div>
            )}

            <div className="relative ">
              <input
                type={showPassword ? 'text' : 'password'}
                name={name}
                id={id}
                value={inputValues}
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
                minLength={min_length}
                maxLength={max_length}
                disabled={disabled}
                readOnly={read_only}
                className={`${input(icon, icon_position)} `}
              />
              <div
                onClick={() => {
                  setFocus(!focus);
                }}
                className={`${outlineLabel(focus, labelPosition, inputValues, error, validation)} `}
              >
                {label}
                <span className={`${requiredVisible(required)}`}> *</span>
              </div>
            </div>

            {show_eye_icon && (
              <div className={`${iconsSelf()}`}>
                {' '}
                {showPassword ? (
                  <AiOutlineEye
                    onClick={() => {
                      setShowPassword(false);
                    }}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    onClick={() => {
                      setShowPassword(true);
                    }}
                  />
                )}{' '}
              </div>
            )}

            {icon && icon_position === 'right' && (
              <div
                style={{
                  width: Number(height.split('p')[0]) < 46 ? height : '46px',
                }}
                className={`${icons(icon, icon_position)}`}
              >
                {' '}
                {icon_src ? icon_src : <BiSolidLockAlt />}{' '}
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
};

export default React.memo(PasswordInput);
