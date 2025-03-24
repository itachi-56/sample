'use client';

import { useDispatch } from 'react-redux';
import React, { useRef, useState, useEffect } from 'react';
import Select from '@/Components/Ui/Select';
import { TextInput } from '@/Components/Ui/TextInput';
import { Autocomplete, TextField } from '@mui/material';
import { GroupIcon } from 'lucide-react';
import {
  RowIcon,
  DropDownArrow,
  DropDownArrowBright,
  DeletIcon,
} from './icons';
import { updateFilter } from './VeiwSlice/filterSlice';
import { Calendar } from 'primereact/calendar';
import {
  ParentFilterProps,
  FilterType,
  inputFieldss,
} from './VeiwSlice/interface';

const getDepthStyles = (depth = 0) => {
  const styles = {
    wrapper: '',
    background: '',
    border: '',
  };

  const opacity = Math.min(0.02 + depth * 0.03, 0.2);
  const borderOpacity = Math.min(0.05 + depth * 0.05, 0.3);
  styles.background = `border-none bg-opacity-[${(opacity * 100).toFixed(0)}]`;
  styles.border = `bg-[rgba(136,154,188,0.08)] bg-opacity-[${(borderOpacity * 100).toFixed(0)}]`;
  styles.wrapper = `rounded-lg`;

  return styles;
};

const ParentFilter: React.FC<ParentFilterProps> = ({
  filter,
  filtersdata,
  addFilter,
  deleteFilter,
  depth = 0,
  setParentBorderColors,
  borderColor,
  setBorderColor,
  openChildAsPerIndex,
  setOpenChildAsPerIndex,
  filters,
}) => {
  const dispatch = useDispatch();
  const [openOperatorDropdown, setOpenOperatorDropdown] = useState<
    string | null
  >(null);
  const [hoverBorderColor, sethoverBorderColor] = useState<string>('');
  const styles = getDepthStyles(depth);

  const contentRef = useRef<null | HTMLDivElement>(null);
  const topBorderRef = useRef<null | HTMLDivElement>(null);
  const bottomBorderRef = useRef<null | HTMLDivElement>(null);
  const updateBorderHeight = () => {
    if (contentRef.current && topBorderRef.current && bottomBorderRef.current) {
      const contentHeight = contentRef?.current?.offsetHeight;
      topBorderRef.current.style.height = `${contentHeight + 31}px`;
      bottomBorderRef.current.style.height = `${contentHeight - 34}px`;
    }
  };

  useEffect(() => {
    updateBorderHeight();
    window.addEventListener('resize', updateBorderHeight);
    return () => window.removeEventListener('resize', updateBorderHeight);
  }, [updateBorderHeight, filters, filter, filtersdata]);

  const selectColumnType = (
    columnType: string,
    filterId: string,
    filter: FilterType
  ) => {
    const targetId = filter.isChild ? filter.children?.[0]?.id : filterId;
    const filterColumnData = filtersdata.find(
      (column) => column.columnType === columnType
    );
    const filterColum = filterColumnData.conditions.filter(
      (condition: { filterCondition: string }) =>
        condition.filterCondition === 'Name Contains' ||
        'IS' ||
        'Name does not Contains' ||
        'Contains'
    );

    const filterUniqueData = filterColum.map(
      (item: { filterCondition: string }) => item.filterCondition
    );
    selectConditionValue(filterUniqueData[0], filterId, filter);
    if (
      targetId &&
      filterColumnData !== '' &&
      filterColumnData !== undefined &&
      filterColumnData !== null
    ) {
      dispatch(
        updateFilter({
          id: targetId,
          updates: {
            tableId: filterColumnData?.tableId || '',
            tableName: filterColumnData?.tableName || '',
            columnId: filterColumnData?.columnType || '',
            columnName: filterColumnData?.columnName || '',
            selectedColumn: filterColumnData?.columnType || '',
            inputValues: {},
          },
        })
      );
    }
  };
  const selectConditionValue = (
    value: string,
    filterId: string,
    filter: FilterType
  ) => {
    const targetId = filter.isChild ? filter.children?.[0]?.id : filterId;
    if (targetId && value !== '' && value !== undefined && value !== null) {
      dispatch(
        updateFilter({
          id: targetId,
          updates: {
            selectedFilterConditionValue: value,
            inputValues: {},
          },
        })
      );
    }
  };

  const renderInputField = (
    inputField: any,
    fieldIndex: number,
    filterId: string,
    filter: FilterType
  ) => {
    const targetId = filter.isChild ? filter.children?.[0]?.id : filterId;
    const fieldKey = `${inputField.type}-${fieldIndex}-${targetId}`;
    switch (inputField.type) {
      case 'calender':
        return (
          <div className="w-[300px]" key={fieldKey}>
            <label className="text-gray-700 text-sm font-medium">
              Select Date
            </label>
            <Calendar
              value={
                filter.inputValues[fieldKey]
                  ? new Date(filter.inputValues[fieldKey])
                  : null
              }
              onChange={(e) => {
                const selectedDate = e.target.value;
                dispatch(
                  updateFilter({
                    id: String(targetId),
                    updates: {
                      inputValues: {
                        ...filter.inputValues,
                        [fieldKey]: selectedDate,
                      },
                    },
                  })
                );
              }}
              showIcon
              dateFormat="dd/mm/yy"
              className="custom-calendar w-[444px] "
            />
          </div>
        );
      case 'timeinput':
        return (
          <div>
            <Calendar
              value={filter.inputValues[fieldKey]}
              hourFormat="12"
              timeOnly
              onChange={(time) => {
                if (!time) return;
                dispatch(
                  updateFilter({
                    id: String(targetId),
                    updates: {
                      inputValues: {
                        ...filter.inputValues,
                        [fieldKey]: time.value,
                      },
                    },
                  })
                );
              }}
            />
          </div>
        );
      case 'text':
        return (
          <TextInput
            key={fieldKey}
            id={`text-${filterId}-${fieldIndex}`}
            name={`text`}
            defaultValue={filter.inputValues[fieldKey] || ''}
            onChange={(e) =>
              dispatch(
                updateFilter({
                  id: String(targetId),
                  updates: {
                    inputValues: {
                      ...filter.inputValues,
                      [fieldKey]: e.target.value,
                    },
                  },
                })
              )
            }
            placeholder={inputField.placeholder}
            label=""
            labelPosition="top"
            height="35px"
            width="239px"
            helperText={false}
          />
        );
      case 'number':
        return (
          <TextInput
            key={fieldKey}
            id={`number-${filterId}-${fieldIndex}`}
            name={`number-${filterId}-${fieldIndex}`}
            type="number"
            defaultValue={filter.inputValues[fieldKey] || ''}
            onChange={(e) =>
              dispatch(
                updateFilter({
                  id: String(targetId),
                  updates: {
                    inputValues: {
                      ...filter.inputValues,
                      [fieldKey]: e.target.value,
                    },
                  },
                })
              )
            }
            placeholder={inputField.placeholder}
            height="35px"
            width="239px"
            helperText={false}
          />
        );
      case 'Dropdown':
        return (
          <Autocomplete
            key={fieldKey}
            multiple
            options={inputFieldss.options || []}
            getOptionLabel={(option: { label: string; value: string }) =>
              option?.label
            }
            value={
              Array.isArray(filter.inputValues[fieldKey])
                ? filter.inputValues[fieldKey].map(
                    (value: string) =>
                      inputFieldss.options?.find(
                        (option: { label: string; value: string }) =>
                          option.value === value
                      ) || null
                  )
                : []
            }
            onChange={(_, selectedOptions) => {
              const selectedValues = selectedOptions.map(
                (option) => option?.value
              );
              dispatch(
                updateFilter({
                  id: String(targetId),
                  updates: {
                    inputValues: {
                      ...filter.inputValues,
                      [fieldKey]: selectedValues,
                    },
                  },
                })
              );
            }}
            renderInput={(params) => (
              <TextField {...params} label="Select" variant="outlined" />
            )}
          />
        );
      default:
        return null;
    }
  };
  const renderFilter = (filter: FilterType, currentDepth = depth) => (
    <div
      key={filter.id}
      className={`flex flex-col  ${filter.isChild ? 'pl-[89px]' : 'pl-20 '}  ${currentDepth > 0 ? ' pl-6 ' : ''}`}
    >
    
      <div
        className={`relative ${filter.children ? `border mt-3 ${styles.border} ${styles.background} max-w-max pr-3   ` : ''}`}
      >
        {filter.children && (
          <div className="flex items-center relative cursor-pointer  z-50 pl-10 pt-[12px]">
            <div
              onClick={() =>
                setOpenOperatorDropdown((id) => (id ? null : filter.id))
              }
              className="w-[74px] h-[35px] relative flex items-center justify-center gap-2 rounded-[3px] border-[1px] bg-white border-[rgba(241,241,241,1)]"
            >
              <div className="flex justify-center w-[75%] text-[rgba(129,134,140,1)] text-[16px] font-medium lato">
                {filter.operator}
              </div>
              <div className="pt-1 w-[25%] flex justify-start">
                <DropDownArrowBright />
              </div>
              <div
                ref={topBorderRef}
                className="border-l-[0.5px]  absolute top-[34px]  z-50 left-3 border-[rgba(29,87,199,0.63)]"
              ></div>
            </div>

            {openOperatorDropdown === filter.id && (
              <div className="absolute top-10 h-[69px] w-[88px] z-50 bg-white  shadow flex flex-col pl-3">
                <div
                  onClick={() => {
                    dispatch(
                      updateFilter({
                        id: filter.id,
                        updates: { operator: 'AND' },
                      })
                    );
                    setOpenOperatorDropdown(null);
                  }}
                  className="cursor-pointer h-[50%] flex items-center text-[rgba(129,134,140,1)] text-[15px] font-medium lato"
                >
                  AND
                </div>
                <div
                  onClick={() => {
                    dispatch(
                      updateFilter({
                        id: filter.id,
                        updates: { operator: 'OR' },
                      })
                    );
                    setOpenOperatorDropdown(null);
                  }}
                  className="cursor-pointer h-[50%] flex items-center text-[rgba(129,134,140,1)] text-[15px] font-medium lato"
                >
                  OR
                </div>
              </div>
            )}
            <div
              className="cursor-pointer flex absolute left-[70%] "
              onClick={() => deleteFilter(filter.id)}
            >
              <DeletIcon />
            </div>
          </div>
        )}
        {filter.isChild && filter.children ? (
          <div ref={contentRef}>
            {filter.children.map((child) =>
              renderFilter(child, currentDepth + 1)
            )}
          </div>
        ) : (
          <div
            className={`flex items-center gap-[18px]  ${
              filter.isChild == false ? 'pl-[49px]' : 'pl-[50px]'
            }`}
          >
            <div className="w-[366px] flex items-center h-full">
              <div
                className={`${filter.isChild == false ? 'w-[93px] z-50 top-[25px] left-[-43px]' : ' z-50 w-[20px] top-[30px] left-[30px]'} 
                 border-t-[0.5px] absolute  border-[rgba(29,87,199,0.63)]`}
              ></div>

              <Select
                id={`operation-${filter.id}`}
                label={''}
                labelPosition="top"
                height="35px"
                width="366px"
                helperText={false}
                defaultValue={filter.selectedColumn}
                options={filtersdata.map((columnName) => ({
                  label: columnName.columnType || 'Unknown Column',
                  value: columnName.columnType || 'unknown',
                }))}
                placeholder="Select Option"
                onSelect={(selectedOption: { value: string }) => {
                  if (
                    selectedOption?.value &&
                    selectedOption.value !== 'unknown'
                  ) {
                    selectColumnType(selectedOption.value, filter.id, filter);
                  } else {
                    console.warn('Invalid column type selected');
                  }
                }}
              />
            </div>

            <div className="w-[366px]">
              <Select
                id={`filter-condition-${filter.id}`}
                label={''}
                labelPosition="top"
                height="35px"
                width="366px"
                helperText={false}
                defaultValue={filter.selectedFilterConditionValue}
                options={
                  filtersdata
                    .find(
                      (col) =>
                        col.columnType ===
                        (filter.isChild
                          ? filter.children?.[0]?.selectedColumn
                          : filter.selectedColumn)
                    )
                    ?.conditions?.map((cond: { filterCondition: string }) => ({
                      label: cond.filterCondition,
                      value: cond.filterCondition,
                    })) || []
                }
                placeholder="Select Option"
                onSelect={(selectedOption: { value: string }) => {
                  selectConditionValue(
                    selectedOption?.value,
                    filter.id,
                    filter
                  );
                }}
              />
            </div>

            <div className="flex gap-4">
              {filtersdata
                .find(
                  (col) =>
                    col.columnType ===
                    (filter.isChild
                      ? filter.children?.[0]?.selectedColumn
                      : filter.selectedColumn)
                )
                ?.conditions?.find(
                  (cond: { filterCondition: string }) =>
                    cond.filterCondition === filter.selectedFilterConditionValue
                )
                ?.inputFeild?.map((inputField: string, fieldIndex: number) =>
                  renderInputField(inputField, fieldIndex, filter.id, filter)
                )}
            </div>
            <div
              className="cursor-pointer pr-3"
              onClick={() => deleteFilter(filter.id)}
            >
              <DeletIcon />
            </div>
          </div>
        )}

        {filter.isChild && (
          <div className=" flex relative pl-20 pt-3 pb-3">
            <div
              ref={bottomBorderRef}
              className="border-t-[0.5px] absolute top-[30px] left-[53px] w-[27px] border-[rgba(29,87,199,0.63)]"
            ></div>
            <div className="flex justify-center items-center ">
              <div
                onMouseEnter={() => {
                  sethoverBorderColor(filter.id);
                }}
                onClick={() => {
                  setOpenChildAsPerIndex((id) => (id ? null : filter.id));
                  setBorderColor(filter.id);
                  setParentBorderColors(false);
                }}
                className={`h-[35px] w-[89px] rounded-[3px] border-[1px] cursor-pointer bg-[rgba(249,249,249,1)] bg-white flex items-center justify-center ${
                  borderColor == filter.id
                    ? 'border-[rgba(29,87,199,1)]'
                    : 'border-[rgba(241,241,241,1)]'
                } ${
                  filter.id === hoverBorderColor
                    ? 'group-hover:border-[rgba(29,87,199,1)]'
                    : 'group-hover:border-[rgba(241,241,241,1)]'
                }`}
              >
                <div className="2xl:font-extrabold lato 2xl:text-[15px] text-[rgba(123,129,144,1)] cursor-pointer flex items-center gap-1">
                  +{' '}
                  <span className="lato 2xl:font-medium 2xl:text-[15px] lato text-[rgba(123,129,144,1)]">
                    Add
                  </span>
                  <DropDownArrow />
                </div>
              </div>
              {openChildAsPerIndex === filter.id && (
                <div className="absolute z-50 h-[70px] w-[214px] top-14 left-[6%] shadow cursor-pointer bg-white flex flex-col justify-center">
                  <div
                    className="flex items-center gap-2 pl-6 hover:bg-[rgba(29,87,199,0.04)] group h-[35px]"
                    onClick={() => {
                      addFilter(filter.id, false);
                      setBorderColor('');
                      setOpenChildAsPerIndex(null);
                    }}
                  >
                    <RowIcon />
                    <div className="lato 2xl:font-medium 2xl:text-[14px] text-[rgba(154,157,162,1)] group-hover:text-[rgba(29,87,199,1)]">
                      Add Row
                    </div>
                  </div>

                  <div
                    className="flex items-center gap-2 pl-6 h-[35px] group hover:bg-[rgba(29,87,199,0.04)]"
                    onClick={() => {
                      addFilter(filter.id, true);
                      setBorderColor('');
                      setOpenChildAsPerIndex(null);
                    }}
                  >
                    <GroupIcon />
                    <div className="lato 2xl:font-medium 2xl:text-[14px] text-[rgba(154,157,162,1)] group-hover:text-[rgba(29,87,199,1)]">
                      Add Group
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return <div>{renderFilter(filter)}</div>;
};

export default ParentFilter;
