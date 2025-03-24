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
import { RiInformationFill } from 'react-icons/ri';
// import { ErrorIcon, UserWithCircleIcon } from '@/Icons/Icons';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import {
  DatePickerMainParent,
  DatePickerParent,
  iconParentSelf,
  iconsSelf,
  onlyToday,
  selected,
} from '../ClassName/DatePicker';
import {
  box,
  calendar,
  calendarDaysAndDates,
  calendarHeader,
  emptys,
  todays,
} from '../ClassName/DatePicker';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { DatePickerInterface } from '@/Types/Ui';
import { UserWithCircleIcon, ErrorIcon } from '@/Icons/Icons';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DatePicker: React.FC<DatePickerInterface> = ({
  id,
  name,
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
  errorText = '',

  onSelect,
  minYear,
  maxYear,
}: DatePickerInterface) => {
  const [focus, setFocus] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const selectDropdownRef = useRef<HTMLDivElement>(null);

  const today = new Date();

  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [days, setDays] = useState([]);
  const [years, setYears] = useState<
    { year: number; isCurrentYear: boolean; isSelected: boolean }[]
  >([]);
  const [value, setValue] = useState<Date | string>(new Date());
  const [inputError, setInputError] = React.useState<{
    error: boolean;
    errorText: string;
  }>({ error, errorText });
  const selectedDate = new Date(value);
  const [type, setType] = useState('date');
  const inputValues = defaultValue || value;

  React.useEffect(() => {
    if (value) {
      onSelect && onSelect(value);
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

  const generateCalendar = (year: any, month: any) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const tempDays: any = [];

    for (let i = 0; i < firstDay; i++) {
      tempDays.push({ day: '', isEmpty: true });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      tempDays.push({
        day,
        date: new Date(year, month, day),
        isToday:
          day === today.getDate() &&
          month === today.getMonth() &&
          year === today.getFullYear(),
        isSelected:
          day === selectedDate.getDate() &&
          month === selectedDate.getMonth() &&
          year === selectedDate.getFullYear(),
        isEmpty: false,
      });
    }

    setDays(tempDays);
  };

  

  useEffect(() => {
    generateCalendar(currentYear, currentMonth);
  }, [currentYear, currentMonth, value]);

  const generateYear = (start: number, end: number) => {
    const tempYear: {
      year: number;
      isCurrentYear: boolean;
      isSelected: boolean;
    }[] = [];
    for (let i = start; i <= end; i++) {
      tempYear.push({
        year: i,
        isCurrentYear: today.getFullYear() === i,
        isSelected: selectedDate.getFullYear() === i,
      });
    }
    setYears(tempYear);
  };

  useEffect(() => {
    if (minYear && maxYear) {
      generateYear(minYear, maxYear);
    }
  }, [minYear, maxYear, value]);

  const prevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    setCurrentYear((prev) => (currentMonth === 0 ? prev - 1 : prev));
  };

  const nextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    setCurrentYear((prev) => (currentMonth === 11 ? prev + 1 : prev));
  };

  const setDate = () => {
    if (value instanceof Date && !isNaN(value.getTime())) {
      const year = value.getFullYear();
      const month = String(value.getMonth() + 1).padStart(2, '0');
      const day = String(value.getDate()).padStart(2, '0');
      return `${day}/${month}/${year}`;
    }
  };

  const updateMonth = (index: number) => {
    setCurrentMonth(index);
    setValue((prev: any) => {
      const newDate = new Date(prev);
      newDate.setMonth(index);
      return newDate;
    });
  };

  const updateYear = (years: number) => {
    setCurrentYear(years);
    setValue((prev: any) => {
      const newDate = new Date(prev);
      newDate.setFullYear(years);
      return newDate;
    });
  };

  const handleChange = (date: any) => {
    setInputError({ error: false, errorText: '' });
    const inputDate: string = date;
    const parts: string[] = inputDate.includes('/')
      ? inputDate.split('/')
      : inputDate.split('-');
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    const dateObject = new Date(formattedDate);

    if (dateObject.toString() !== 'Invalid Date') {
      setValue(formattedDate);
      setCurrentMonth(dateObject.getMonth());
      setCurrentYear(dateObject.getFullYear());
    } else {
      setInputError({
        error: true,
        errorText: 'wrong Date formate DD/MM/YYYY',
      });
    }
  };

  return (
    <div
      id={`${id}-date-picker`}
      className={`${inputComponent(labelPosition)}`}
    >
      <div className={`${inputLabel(labelPosition)} `}>
        {label}
        <span className={`${requiredVisible(required)}`}> *</span>
      </div>
      <div className="">
        <div
          style={{ width: width, height: height }}
          className={`${inputParent(focus, inputError.error, validation)}`}
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
                name={name}
                onFocus={(e) => {
                  setFocus(!focus);
                  setIsOpen(true);
                  onFocus && onFocus(e);
                }}
                id={id}
                onChange={(e: any) => {
                  handleChange(e.target.value);
                }}
                value={setDate()}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                disabled={disabled}
                readOnly={read_only}
                className={`${input(icon, iconPosition)} `}
                autoComplete={'off'}
              />
              <div
                className={`${outlineLabel(focus, labelPosition, inputValues.toString(), inputError.error, validation)}`}
              >
                {label}
                <span className={`${requiredVisible(required)}`}> *</span>
              </div>
            </div>
            <div
              style={{
                width: Number(height.split('p')[0]) < 46 ? height : '46px',
              }}
              className={`${iconsSelf(focus, isOpen, inputError.error)} `}
            >
              {' '}
              <MdOutlineCalendarMonth />{' '}
            </div>

            {icon && iconPosition === 'right' && (
              <div className={`${icons(icon, iconPosition)}`}>
                {' '}
                {iconSrc || <UserWithCircleIcon />}{' '}
              </div>
            )}
          </div>
          {isOpen && (
            <div className={`${DatePickerMainParent()} w-full`}>
              <div
                id={`${id}-date-options`}
                className={`${shadow()} ${DatePickerParent()} min-w-[280px]`}
              >
                <div className="pt-2">
                  <div className={`${calendar()}  rounded-md`}>
                    {type === 'date' && (
                      <div>
                        <div className={`${calendarHeader()}`}>
                          <button
                            onClick={prevMonth}
                            className="text-[20px] flex justify-start"
                          >
                            <MdKeyboardArrowLeft />
                          </button>
                          <span
                            onClick={() => {
                              setType('year');
                            }}
                            className="text-primary-color font-medium"
                          >{`${(monthNames[currentMonth] as string).slice(0, 3)} ${currentYear}`}</span>
                          <button
                            onClick={nextMonth}
                            className="text-[20px] flex justify-end"
                          >
                            <MdKeyboardArrowRight />
                          </button>
                        </div>

                        <div
                          className={`${calendarDaysAndDates()} text-primary-color font-medium`}
                        >
                          <div className={box()}>Su</div>
                          <div className={box()}>Mo</div>
                          <div className={box()}>Tu</div>
                          <div className={box()}>We</div>
                          <div className={box()}>Th</div>
                          <div className={box()}>Fr</div>
                          <div className={box()}>Sa</div>
                        </div>
                        <div className={calendarDaysAndDates()}>
                          {days.map((date: any, index) => (
                            <div
                              key={index}
                              className="h-[38px] min-w-[38px] flex justify-center items-center"
                              onClick={() => {
                                // const prevMonthDate = new Date(date.date)
                                // prevMonthDate.setMonth(prevMonthDate.getMonth()+1)
                                setValue(date.date);
                              }}
                            >
                              <div
                                key={index}
                                className={`h-[30px] cursor-pointer w-[30px] flex justify-center items-center rounded-[5px] ${date.isToday && date.isSelected ? todays() : date.isToday ? onlyToday() : date.isSelected ? todays() : 'date-shadow'} ${date.isEmpty ? emptys() : ''}`}
                              >
                                {date.day}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {type === 'year' && (
                      <div>
                        <div className={`${calendarHeader()} px-[10px]`}>
                          <span
                            onClick={() => {
                              setType('month');
                            }}
                            className="text-primary-color col-span-3 font-medium"
                          >{`${currentYear}`}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 max-h-[200px] overflow-y-auto">
                          {years.map((year, index) => (
                            <div
                              key={index}
                              className="flex  justify-center w-full"
                            >
                              <div
                                className={`py-[1px] px-3 ${year.isCurrentYear && year.isSelected ? selected() : year.isCurrentYear ? onlyToday() : year.isSelected ? selected() : 'date-shadow'}`}
                                onClick={() => {
                                  updateYear(year.year);
                                }}
                                key={index}
                              >
                                {year.year}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {type === 'month' && (
                      <div>
                        <div className={`${calendarHeader()} px-[10px]`}>
                          <span
                            onClick={() => {
                              setType('date');
                            }}
                            className="text-primary-color  col-span-3 font-medium"
                          >{`${monthNames[currentMonth]}`}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {monthNames.map((month, index) => (
                            <div key={index} className="flex  justify-center">
                              <div
                                className={`py-[1px] px-3 ${index === currentMonth ? selected() : 'date-shadow'}`}
                                onClick={() => {
                                  updateMonth(index);
                                }}
                                key={index}
                              >
                                {month.slice(0, 3)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {inputError.error ? (
          <div className={`${validationErrorEle}`}>
            <div>
              <ErrorIcon />
            </div>
            <div>{inputError.errorText}</div>
          </div>
        ) : helperText && value.toString().length === 0 ? (
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
  );
};

export default React.memo(DatePicker);
