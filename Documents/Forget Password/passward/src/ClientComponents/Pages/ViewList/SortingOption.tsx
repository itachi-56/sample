import { useDispatch, useSelector } from 'react-redux';
import Select from '@/Components/Ui/Select';
import {
  updateSortingDetails,
  toggleSortDirection,
  removeSortOption,
} from './VeiwSlice/sortingSlice';
import React from 'react';
import { SortingOptionProps } from './VeiwSlice/interface';



function SortingOption({ option, filtersdata }: SortingOptionProps) {
  const dispatch = useDispatch();
  const sortOptions = useSelector((state: any) => state.sorting.sortOptions);
  console.log('⛲ initaill component of sorting:', sortOptions);

  return (
    <div className="flex items-center gap-4">
      <div>
        <Select
          id={`sorting-${option.id}`}
          label={''}
          labelPosition="top"
          height="34px"
          width="336px"
          helperText={false}
          options={filtersdata
            .filter(
              (columnName) =>
                !sortOptions.some(
                  (opt: any) =>
                    opt.id !== option.id &&
                    opt.selectedColumn === columnName.columnType
                )
            )
            .map((columnName) => ({
              value: columnName.columnType,
              label: columnName.columnType,
            }))}
          placeholder="Choose sorting"
          onSelect={(selectedOption: any) => {
            if (
              selectedOption !== '' &&
              selectedOption !== undefined &&
              selectedOption !== null
            ) {
              dispatch(
                updateSortingDetails({
                  id: option.id,
                  details: selectedOption?.value || '',
                })
              );
            }
          }}
          defaultValue={option.selectedColumn || ''}
        />
      </div>
      <div className="pt-3">
        <div
          className="flex flex-row md:h-[20px]  md:w-[100px] lg:h-[25px] lg:w-[125px] 2xl:h-[35px] 2xl:w-[160px]
       rounded-[3px] 2xl:rounded-[3px] border-[1px] border-solid border-[rgb(29,29,29,0.13)] duration-500 
       overflow-hidden cursor-pointer"
        >
          <div
            className={`h-full w-[50%] flex items-center justify-center md:gap-[2px] 2xl:gap-2 ${
              option.sortDirection === 'asc'
                ? 'bg-[rgba(29,87,199,1)]'
                : 'bg-none'
            }`}
            onClick={() => dispatch(toggleSortDirection(option.id))}
          >
            <div
              className={` md:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px] lato ${
                option.sortDirection === 'asc' ? 'text-white' : 'text-[#81868C]'
              }`}
            >
              {option.selectedColumn === 'Number' ? '0' : 'A'}
            </div>
            <div>
              <svg
                width="15"
                height="12"
                viewBox="0 0 15 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="md:h-[12px] md:w-[12px]"
              >
                <path
                  d="M14.5303 6.53033C14.8232 6.23744 14.8232 5.76256 14.5303 5.46967L9.75736 0.696699C9.46447 0.403806 8.98959 0.403806 8.6967 0.696699C8.40381 0.989593 8.40381 1.46447 8.6967 1.75736L12.9393 6L8.6967 10.2426C8.40381 10.5355 8.40381 11.0104 8.6967 11.3033C8.98959 11.5962 9.46447 11.5962 9.75736 11.3033L14.5303 6.53033ZM0 6.75H14V5.25H0V6.75Z"
                  fill={option.sortDirection === 'asc' ? 'white' : '#81868C'}
                />
              </svg>
            </div>
            <div
              className={` md:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px] lato ${
                option.sortDirection === 'asc' ? 'text-white' : 'text-[#81868C]'
              }`}
            >
              {option.selectedColumn === 'Number' ? '9' : 'Z'}
            </div>
          </div>

          <div
            className={`h-full w-[50%] flex items-center justify-center md:gap-[2px] 2xl:gap-2 ${
              option.sortDirection === 'desc'
                ? 'bg-[rgba(29,87,199,1)]'
                : 'bg-none'
            }`}
            onClick={() => dispatch(toggleSortDirection(option.id))}
          >
            <div
              className={` 2xl:text-[16px] md:text-[13px] lg:text-[14px] xl:text-[15px] lato ${
                option.sortDirection === 'desc'
                  ? 'text-white'
                  : 'text-[#81868C]'
              }`}
            >
              {option.selectedColumn === 'Number' ? '9' : 'Z'}
            </div>
            <div>
              <svg
                width="15"
                height="12"
                viewBox="0 0 15 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="rotate-180 md:h-[12px] md:w-[12px]"
              >
                <path
                  d="M14.5303 6.53033C14.8232 6.23744 14.8232 5.76256 14.5303 5.46967L9.75736 0.696699C9.46447 0.403806 8.98959 0.403806 8.6967 0.696699C8.40381 0.989593 8.40381 1.46447 8.6967 1.75736L12.9393 6L8.6967 10.2426C8.40381 10.5355 8.40381 11.0104 8.6967 11.3033C8.98959 11.5962 9.46447 11.5962 9.75736 11.3033L14.5303 6.53033ZM0 6.75H14V5.25H0V6.75Z"
                  fill={option.sortDirection === 'desc' ? 'white' : '#81868C'}
                />
              </svg>
            </div>
            <div
              className={` 2xl:text-[16px] lato md:text-[13px] lg:text-[14px] xl:text-[15px] ${
                option.sortDirection === 'desc'
                  ? 'text-white'
                  : 'text-[#81868C]'
              }`}
            >
              {option.selectedColumn === 'Number' ? '0' : 'A'}
            </div>
          </div>
        </div>
      </div>

      {sortOptions.length > 1 && (
        <div
          onClick={() => dispatch(removeSortOption(option.id))}
          className="cursor-pointer pt-4"
        >
          <svg
            width="11"
            height="15"
            viewBox="0 0 11 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.785714 13.3333C0.785714 14.25 1.49286 15 2.35714 15H8.64286C9.50714 15 10.2143 14.25 10.2143 13.3333V3.33333H0.785714V13.3333ZM2.35714 5H8.64286V13.3333H2.35714V5ZM8.25 0.833333L7.46429 0H3.53571L2.75 0.833333H0V2.5H11V0.833333H8.25Z"
              fill="#889ABC"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

export default React.memo(SortingOption);
