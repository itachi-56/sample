'use client';
import React, { useEffect, useRef, useState } from 'react';
import { ToggleInterface } from '@/Types/Ui';
import { inputLabel, requiredVisible } from '../ClassName/Input';

const Toggle = ({
  label,
  height = '20px',
  width = '37px',
  required = false,
  trueName,
  falseName,
  value,
  onChange,
  name,
  onToggle,
}: ToggleInterface) => {
  const toggleRef = useRef<HTMLInputElement | null>(null);
  const [enable, setEnable] = useState<boolean>(value ?? false);

  useEffect(() => {
    if (value !== undefined) {
      setEnable(value);
    }
  }, [value]);

  const handleToggle = () => {
    const newValue = !enable;
    if (value === undefined) {
      setEnable(newValue);
    }
    onToggle?.(newValue);
    onChange?.(newValue as any);
  };

  return (
    <div className="grid grid-[auto,1fr] pt-[6px] -translate-y-[3px] transform-none ">
      <div className={inputLabel('top')}>
        {label}
        {required && <span className={`${requiredVisible(required)}`}> *</span>}
      </div>
      <div
        className={`inline-grid h-[37px] gap-3 ${
          trueName && falseName
            ? 'grid-cols-[auto,1fr,auto]'
            : falseName
              ? 'grid-cols-[auto,1fr]'
              : trueName
                ? 'grid-cols-[1fr,auto]'
                : 'grid-cols-1'
        } items-center`}
      >
        {falseName && <div>{falseName}</div>}
        <div>
          <div
            style={{ width, height }}
            onClick={handleToggle}
            className={`bdr-toggle-border-weight ${
              enable
                ? 'bg-toggle-true-bg-color bdr-toggle-border-color'
                : 'bg-toggle-false-bg-color bdr-toggle-border-color'
            } flex relative rounded-toggle-border-radius cursor-pointer`}
          >
            <div
              style={{ width: `calc(${height} - 3px)` }}
              className={`h-full p-[1px] rounded-[50%] absolute duration-300 ${
                enable ? 'right-0' : 'left-0'
              }`}
            >
              <div className="h-full w-full rounded-[50%] bg-toggle-innercircle-color"></div>
            </div>
          </div>
        </div>
        {trueName && <div>{trueName}</div>}
      </div>
      <input
        type="radio"
        ref={toggleRef}
        name={name}
        style={{ display: 'none' }}
        checked={enable}
        readOnly
      />
    </div>
  );
};

export default Toggle;
