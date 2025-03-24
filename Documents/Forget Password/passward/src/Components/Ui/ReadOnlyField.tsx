'use client';
import React from 'react';
import {
  iconParentSelf,
  selfIcons,
  selfInput,
  selfInputLabel,
  selfOutlineLabel,
  selfInputComponent,
  selfInputParent,
  selfRequiredVisible,
} from '../ClassName/NoEdit';

import { EditDisabledIcon } from '@/Icons/Icons';
import { ReadOnlyFieldInterface } from '@/Types/Ui';

const ReadOnlyField: React.FC<ReadOnlyFieldInterface> = ({
  required = false,
  label,
  value,
  height = '46px',
  width = 'auto',
  labelPosition = 'top',
  icon = false,
  iconPosition = 'right',
  border = true,
  bg = true,
  labelIcon = false,
  labelIconPosition = 'left',
  labelIconSrc = '',
}: ReadOnlyFieldInterface) => {
  return (
    <div className={`${selfInputComponent(labelPosition)}`}>
      <div className={`${selfInputLabel(labelPosition)} `}>
        {label}
        <span className={`${selfRequiredVisible(required)}`}> *</span>
      </div>
      <div className="">
        <div
          style={{ width: width, height: height }}
          className={`${selfInputParent(false, false, false, border, bg)}`}
        >
          <div
            className={`${iconParentSelf(iconPosition, icon, labelIcon, labelIconPosition)}  `}
          >
            {icon && iconPosition === 'left' && (
              <div
                style={{
                  width: Number(height.split('p')[0]) < 46 ? height : '46px',
                }}
                className={`${selfIcons(icon, iconPosition)} `}
              >
                {' '}
                <i className="icon-non-editable icon-color-non-editable-input-icon-color text-non-editable-input-icon-size"></i>
              </div>
            )}
            {labelIcon && labelIconPosition === 'left' && (
              <div
                style={{
                  width: Number(height.split('p')[0]) < 46 ? height : '46px',
                }}
                className={`${selfIcons(icon, iconPosition)} `}
              >
                {' '}
                {labelIconSrc || <EditDisabledIcon />}{' '}
              </div>
            )}
            <div className="relative ">
              <div
                className={`${selfInput(icon, iconPosition, Number(width.split('p')[0]))}`}
              >
                <div className="w-full">{value}</div>
              </div>
              <div className={`${selfOutlineLabel(labelPosition)}`}>
                {label}
                <span className={`${selfRequiredVisible(required)}`}> *</span>
              </div>
            </div>
            {labelIcon && labelIconPosition === 'right' && (
              <div
                style={{
                  width: Number(height.split('p')[0]) < 46 ? height : '46px',
                }}
                className={`${selfIcons(icon, iconPosition)} `}
              >
                {' '}
                <i className="icon-non-editable icon-color-non-editable-input-icon-color text-non-editable-input-icon-size"></i>
              </div>
            )}
            {icon && iconPosition === 'right' && (
              <div
                style={{
                  width: Number(height.split('p')[0]) < 46 ? height : '46px',
                }}
                className={`${selfIcons(icon, iconPosition)} `}
              >
                {' '}
                <i className="icon-non-editable icon-color-non-editable-input-icon-color text-non-editable-input-icon-size"></i>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ReadOnlyField);
