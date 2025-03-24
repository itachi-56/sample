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
} from '@/Components/ClassName/Input';
import { RiInformation2Fill } from 'react-icons/ri';
import { MdAccessTime } from 'react-icons/md';
import {
  iconParentSelf,
  iconsSelf,
  TimePickerMainParent,
  TimePickerParent,
} from '@/Components/ClassName/TimePicker';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
import { ErrorIcon, UserWithCircleIcon } from '@/Icons/Icons';
import { TimePickerInterface } from '@/Types/Ui';

const TimePicker: React.FC<TimePickerInterface> = ({
  id,
  required = false,
  label,
  height = '46px',
  width = 'auto',
  labelPosition = 'outline',
  disabled = false,
  read_only = false,
  icon = true,
  iconSrc,
  iconPosition = 'left',
  helperText = true,
  helperTextMessage = 'This field is required field',
  validation = true,
  onMouseEnter,
  onMouseLeave,
  defaultValue,
  onFocus,
  error = false,
  errorText,
  onSelect,
  hours = true,
  minutes = true,
  seconds = true,
  timeDuration = 12,
}: TimePickerInterface) => {
  const [focus, setFocus] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const selectDropdownRef = useRef<HTMLDivElement>(null);

  const [value, setValue] = useState<Date | string>(defaultValue as string);

  const [currentHour, setCurrentHour] = useState<number>(new Date().getHours());
  const [currentMinute, setCurrentMinute] = useState<number>(
    new Date().getMinutes()
  );
  const [currentSecond, setCurrentSecond] = useState<number>(
    new Date().getSeconds()
  );

  useEffect(() => {
    if (value) {
      const date = new Date(value as Date);
      setCurrentHour(date.getHours());
      setCurrentMinute(date.getMinutes());
      setCurrentSecond(date.getSeconds());
    }
  }, [value]);

  useEffect(() => {
    if (defaultValue) {
      const date = new Date(defaultValue);
      setValue(date);
      setCurrentHour(date.getHours());
      setCurrentMinute(date.getMinutes());
      setCurrentSecond(date.getSeconds());
    }
  }, [defaultValue]);

  useEffect(() => {
    setValue(new Date());
  }, []);

  const inputValues = defaultValue || value;

  const showTime = (): string[] => {
    const hours = String(currentHour).padStart(2, '0');
    const minutes = String(currentMinute).padStart(2, '0');
    const seconds = String(currentSecond).padStart(2, '0');
    return timeDuration === 12
      ? [
          Number(hours) > 12 ? (Number(hours) - 12).toString() : hours,
          minutes,
          seconds,
          currentHour >= 12 ? 'PM' : 'AM',
        ]
      : [hours, minutes, seconds];
  };

  useEffect(() => {
    if (focus) {
      setValue(new Date());
    }
  }, [focus]);

  React.useEffect(() => {
    if (value) {
      onSelect(value);
    }
  }, [value, onSelect]);

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectDropdownRef.current &&
      !selectDropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
    if (selectDropdownRef.current) {
      setFocus(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const prevHour = () => {
    if (!value) return;
    const currentDate = new Date(value as Date);
    const currentHour = currentDate.getHours();
    const updatedHour =
      timeDuration === 12
        ? currentHour === 1
          ? 12
          : currentHour - 1
        : currentHour === 0
          ? 23
          : currentHour - 1;
    currentDate.setHours(updatedHour);
    setCurrentHour(updatedHour);
    setValue(currentDate as any);
  };

  const nextHour = () => {
    if (!value) return;
    const currentDate = new Date(value as Date);
    const currentHour = currentDate.getHours();
    const updatedHour =
      timeDuration === 12
        ? currentHour === 12
          ? 1
          : currentHour + 1
        : currentHour === 23
          ? 0
          : currentHour + 1;
    currentDate.setHours(updatedHour);
    setCurrentHour(updatedHour);
    setValue(currentDate as any);
  };

  const prevMinute = () => {
    if (!value) return;
    const currentDate = new Date(value as Date);
    const currentMinutes = currentDate.getMinutes();
    const updatedMinutes = currentMinutes === 0 ? 59 : currentMinutes - 1;
    currentDate.setMinutes(updatedMinutes);
    setCurrentMinute(updatedMinutes);
    setValue(currentDate);
  };

  const nextMinute = () => {
    if (!value) return;
    const currentDate = new Date(value as Date);
    const currentMinutes = currentDate.getMinutes();
    const updatedMinutes = currentMinutes === 59 ? 1 : currentMinutes + 1;
    currentDate.setMinutes(updatedMinutes);
    setCurrentMinute(updatedMinutes);
    setValue(currentDate);
  };

  const prevSecond = () => {
    if (!value) return;
    const currentDate = new Date(value as Date);
    const currentSeconds = currentDate.getSeconds();
    const updatedSeconds = currentSeconds === 0 ? 59 : currentSeconds - 1;
    currentDate.setSeconds(updatedSeconds);
    setCurrentSecond(updatedSeconds);
    setValue(currentDate);
  };

  const nextSecond = () => {
    if (!value) return;
    const currentDate = new Date(value as Date);
    const currentSeconds = currentDate.getSeconds();
    const updatedSeconds = currentSeconds === 59 ? 1 : currentSeconds + 1;
    currentDate.setSeconds(updatedSeconds);
    setCurrentSecond(updatedSeconds);
    setValue(currentDate);
  };

  const handleChangeAMPM = () => {
    if (timeDuration === 12) {
      const currentHalf = showTime()[3];
      const fullTime = showTime();
      if (currentHalf === 'PM') {
        fullTime[3] = 'AM';
      } else {
        fullTime[3] = 'PM';
      }
    }
  };

  return (
    <div className={`${inputComponent(labelPosition)}`}>
      <div className={`${inputLabel(labelPosition)} `}>
        {label}
        <span className={`${requiredVisible(required)}`}>*</span>
      </div>
      <div className="">
        <div
          style={{ width: width, height: height }}
          className={`${inputParent(focus, error, validation)}`}
          ref={selectDropdownRef}
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
                onFocus={(e) => {
                  setFocus(!focus);
                  setIsOpen(true);
                  onFocus && onFocus(e);
                }}
                id={id}
                value={showTime()?.join(' : ')}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                disabled={disabled}
                readOnly={read_only}
                className={`${input(icon, iconPosition)} `}
                autoComplete={'off'}
              />
              <div
                className={`${outlineLabel(focus, labelPosition, inputValues ? (inputValues as Date).toString() : '', error, validation)}`}
              >
                {label}
                <span className={`${requiredVisible(required)}`}>*</span>
              </div>
            </div>
            <div
              style={{
                width: Number(height.split('p')[0]) < 46 ? height : '46px',
              }}
              className={`${iconsSelf(focus, isOpen, error)} `}
            >
              {' '}
              <MdAccessTime />{' '}
            </div>

            {icon && iconPosition === 'right' && (
              <div className={`${icons(icon, iconPosition)}`}>
                {' '}
                {iconSrc || <UserWithCircleIcon />}{' '}
              </div>
            )}
          </div>
          {isOpen && (
            <div className={TimePickerMainParent()}>
              <div className={`${shadow()} ${TimePickerParent()} select-none`}>
                <div className="flex">
                  {hours && (
                    <div className="flex-1">
                      <div className="items-center grid grid-rows-3">
                        <div
                          className="justify-self-center text-[24px] hover:bg-primary-color hover:text-primary-in-text-color rounded-[50%]"
                          onClick={prevHour}
                        >
                          <MdKeyboardArrowUp />
                        </div>
                        <div className="justify-self-center font-semibold py-[2px]">
                          {(showTime() || [])[0]}
                        </div>
                        <div
                          className="justify-self-center text-[24px] hover:bg-primary-color hover:text-primary-in-text-color rounded-[50%]"
                          onClick={nextHour}
                        >
                          <MdKeyboardArrowDown />
                        </div>
                      </div>
                    </div>
                  )}

                  {hours && minutes && (
                    <div className="flex justify-center items-center font-bold text-[22px]">
                      :
                    </div>
                  )}

                  {minutes && (
                    <div className="flex-1">
                      <div className="items-center grid grid-rows-3">
                        <div
                          className="justify-self-center text-[24px] hover:bg-primary-color hover:text-primary-in-text-color rounded-[50%]"
                          onClick={prevMinute}
                        >
                          <MdKeyboardArrowUp />
                        </div>
                        <div className="justify-self-center font-semibold py-[2px]">
                          {(showTime() || [])[1]}
                        </div>
                        <div
                          className="justify-self-center text-[24px] hover:bg-primary-color hover:text-primary-in-text-color rounded-[50%]"
                          onClick={nextMinute}
                        >
                          <MdKeyboardArrowDown />
                        </div>
                      </div>
                    </div>
                  )}
                  {minutes && seconds && (
                    <div className="flex justify-center items-center font-bold text-[22px]">
                      :
                    </div>
                  )}

                  {seconds && (
                    <div className="flex-1">
                      <div className="items-center grid grid-rows-3">
                        <div
                          className="justify-self-center text-[24px] hover:bg-primary-color hover:text-primary-in-text-color rounded-[50%]"
                          onClick={prevSecond}
                        >
                          <MdKeyboardArrowUp />
                        </div>
                        <div className="justify-self-center font-semibold py-[2px]">
                          {(showTime() || [])[2]}
                        </div>
                        <div
                          className="justify-self-center text-[24px] hover:bg-primary-color hover:text-primary-in-text-color rounded-[50%]"
                          onClick={nextSecond}
                        >
                          <MdKeyboardArrowDown />
                        </div>
                      </div>
                    </div>
                  )}

                  {timeDuration === 12 && (
                    <div className="flex flex-1 justify-center items-center">
                      <div
                        onClick={handleChangeAMPM}
                        className=" h-[35px] w-[35px] rounded-[50%] font-semibold hover:bg-primary-color hover:text-primary-in-text-color flex justify-center items-center"
                      >
                        <div className="">{(showTime() || [])[3]}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        {error ? (
          <div className={`${validationErrorEle}`}>
            <div>
              <ErrorIcon />
            </div>
            <div>{errorText}</div>
          </div>
        ) : helperText && value && (value as Date).toString().length === 0 ? (
          <div className={`${helperTextEle} `}>
            <div>
              <RiInformation2Fill />
            </div>
            <div>{helperTextMessage}</div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default React.memo(TimePicker);
