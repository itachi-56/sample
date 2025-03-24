'use client';

import { useSelector, useDispatch } from 'react-redux';
import Button from '@/Components/Ui/Button';
import { filtersdata } from '@/MockData/Pages/VewiCreation/data';
import { useState } from 'react';
import { useClickOutside } from 'react-haiku';
import ParentFilter from './ParentFilter';
import React, { useRef, useEffect } from 'react';
import { DropDownArrow, GroupIcon, RelatedTable, RowIcon } from './icons';
import { addFilter, deleteFilter, updateFilter } from './VeiwSlice/filterSlice';
import { ParentFilterProps, FilterType } from './VeiwSlice/interface';
import { realtedtableData } from '@/MockData/Pages/VewiCreation/data';
import Select from '@/Components/Ui/Select';

const containData = [
  {
    id: 1,
    data: 'Contains Data',
  },
  {
    id: 2,
    data: 'Contains Does Not Contains Data',
  },
];

const Filters = ({
  setComponentsId,
}: {
  setComponentsId: (id: string) => void;
}) => {
  const dispatch = useDispatch();
  const filters = useSelector(
    (state: ParentFilterProps[]) => state.filters.filters
  );
console.log('🧰 filters:', filters);

  const [openparentSortDropDown, setOpenParentSortDropDown] =
    useState<boolean>(false);
  const [parentBorderColors, setParentBorderColors] = useState<boolean>(false);
  const [openChildAsPerIndex, setOpenChildAsPerIndex] = useState<string | null>(
    null
  );
  const [relatedTableComponentVisible, setRelatedTableComponentVisible] =
    useState<boolean>(false); // [relatedTableComponentVisible]
  const [showContentSelectDropDown, setshowContentSelectDropDown] =
    useState<boolean>(false); //[showContentSelectDropDown]
  const [borderColor, setBorderColor] = useState<string>('');
  const ref = useRef(null);

  const handleClickOutside = () => setOpenParentSortDropDown(false);
  useClickOutside(ref, handleClickOutside);

  const contentRef = useRef<null | HTMLDivElement>(null);
  const topBorderRef = useRef<null | HTMLDivElement>(null);
  const bottomBorderRef = useRef<null | HTMLDivElement>(null);
  const updateBorderHeight = () => {
    if (contentRef.current && topBorderRef.current && bottomBorderRef.current) {
      const contentHeight = contentRef.current.offsetHeight;
      topBorderRef.current.style.height = `${contentHeight + 60}px`;
      bottomBorderRef.current.style.height = `${contentHeight - 34}px`;
    }
  };

  useEffect(() => {
    updateBorderHeight();
    window.addEventListener('resize', updateBorderHeight);
    return () => window.removeEventListener('resize', updateBorderHeight);
  }, [filters, updateBorderHeight]);

  const addFilterHandler = (parentId = null, isGroup = false) => {
    dispatch(addFilter({ parentId, isGroup }));
  };

  const deleteFilterHandler = (id: string) => {
    dispatch(deleteFilter(id));
  };

  const updateFilterHandler = (id: string, updates: FilterType) => {
    dispatch(updateFilter({ id, updates }));
  };

  const selectedTableName = (tableName: string) => {
    setshowContentSelectDropDown(true)
    const selectedTable = realtedtableData.find((table) => table.tableName === tableName);
    if (selectedTable) {
      const columnNames = selectedTable.Columns.map((col) => col.columnName);
      return columnNames;
    }
    return [];
  };
  
  const SelectedContent=(value:string)=>{
  console.log('🕜 value:', value);
    
  }

  return (
    <>
      <div className="pt-4"></div>
      <div className="h-[35px] relative w-[89px] border-[1px] border-[rgba(241,241,241,1)] bg-[rgba(249,249,249,1)] flex items-center justify-center gap-5">
        <div className="text-[rgba(211,211,211,1)] text-[14px] font-medium lato">
          AND
        </div>
        <div>
          <DropDownArrow />
        </div>
        <div
          ref={topBorderRef}
          className="border-l-[0.5px] absolute top-[34px] left-9 border-[rgba(29,87,199,0.63)]"
        ></div>
      </div>

      <div ref={contentRef} className="flex flex-col ">
        {filters.map((filter: any) => (
          <ParentFilter
            key={filter?.id}
            filter={filter}
            filtersdata={filtersdata}
            addFilter={addFilterHandler}
            deleteFilter={deleteFilterHandler}
            updateFilter={updateFilterHandler}
            setParentBorderColors={setParentBorderColors}
            setBorderColor={setBorderColor}
            borderColor={borderColor}
            setOpenChildAsPerIndex={setOpenChildAsPerIndex}
            openChildAsPerIndex={openChildAsPerIndex}
            filters={filters}
          />
        ))}
      </div>

      {/* Add Related Table */}
      {relatedTableComponentVisible && (
        <div className="w-[366px] flex items-center gap-36 h-full pl-32  ">
          <Select
            id={`operation`}
            label={''}
            labelPosition="top"
            height="35px"
            width="366px"
            helperText={false}
            options={realtedtableData.map((table: any) => ({
              value: table.tableName,
              label: table.tableName,
            }))}
            placeholder="Select Option"
            onSelect={(selectedOption: { value: string }) => {
              if (selectedOption?.value && selectedOption.value !== 'unknown') {
                selectedTableName(selectedOption.value);
              } else {
                console.warn('Invalid column type selected');
              }
            }}
          />
          {showContentSelectDropDown && (
            <div>
              {' '}
              <Select
                id={`operation`}
                label={''}
                labelPosition="top"
                height="35px"
                width="366px"
                helperText={false}
                options={containData.map((tableContains: any) => ({
                  value: tableContains.data,
                  label: tableContains.data,
                }))}
                onSelect={(selectedOption: { value: string }) => {
                  SelectedContent(selectedOption.value)
                }}
                placeholder="Select Option"
              />
            </div>
          )}
        </div>
      )}

      <div className="pt-11 flex relative pl-[100px]" ref={ref}>
        <div
          ref={bottomBorderRef}
          className="border-t-[0.5px] absolute top-[60px] left-[37px] w-[63px] border-[rgba(29,87,199,0.63)]"
        ></div>

        <div className="flex justify-center items-center ">
          <div
            onClick={() => {
              setOpenParentSortDropDown((prev) => !prev);
              setParentBorderColors(true);
              setBorderColor('');
              setOpenChildAsPerIndex(null);
            }}
            className={`h-[35px] w-[89px] rounded-[3px] border-[1px] cursor-pointer bg-[rgba(249,249,249,1)] bg-white group-hover:border-[rgba(29,87,199,1)] 
              flex items-center justify-center ${parentBorderColors ? 'border-[rgba(29,87,199,1)]' : 'border-[rgba(241,241,241,1)]'}`}
          >
            <div className="2xl:font-extrabold lato 2xl:text-[15px] text-[rgba(123,129,144,1)] cursor-pointer flex items-center gap-1 ">
              +{' '}
              <span className="lato 2xl:font-medium 2xl:text-[15px] lato text-[rgba(123,129,144,1)]">
                Add
              </span>
              <DropDownArrow />
            </div>
          </div>

          {openparentSortDropDown && (
            <div className="absolute h-[104px] w-[214px] top-20 left-[5%] shadow cursor-pointer bg-white flex flex-col justify-center">
              <div className="flex items-center gap-2 pl-6 hover:bg-[rgba(29,87,199,0.04)] group h-[35px] ">
                <RowIcon />
                <div
                  onClick={() => {
                    addFilterHandler();
                    setOpenParentSortDropDown(false);
                    setParentBorderColors(false);
                  }}
                  className="lato 2xl:font-medium 2xl:text-[14px] text-[rgba(154,157,162,1)] group-hover:text-[rgba(29,87,199,1)]"
                >
                  Add Row
                </div>
              </div>

              <div className="flex items-center gap-2 pl-6 h-[35px] group hover:bg-[rgba(29,87,199,0.04)]">
                <GroupIcon />

                <div
                  onClick={() => {
                    addFilterHandler(null, true);
                    setOpenParentSortDropDown(false);
                    setParentBorderColors(false);
                  }}
                  className="lato 2xl:font-medium 2xl:text-[14px] text-[rgba(154,157,162,1)] group-hover:text-[rgba(29,87,199,1)]"
                >
                  Add Group
                </div>
              </div>

              <div
                className="flex items-center gap-2 pl-6 h-[35px] group hover:bg-[rgba(29,87,199,0.04)]"
                onClick={() => setRelatedTableComponentVisible(true)}
              >
                <RelatedTable />
                <div className="lato 2xl:font-medium 2xl:text-[14px] text-[rgba(154,157,162,1)] group-hover:text-[rgba(29,87,199,1)]">
                  Add Related Table
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3 items-end  pr-5 pt-9 ">
        <Button
          type="button"
          name={'Cancel'}
          onClick={() => setComponentsId('0')}
        />
        <Button type="submit" name={'SaveDraft'} />
        <Button
          type="button"
          name={'Next'}
          onClick={() => setComponentsId('03')}
        />
      </div>
    </>
  );
};

export default Filters;
