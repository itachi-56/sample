import Button from '@/Components/Ui/Button';
import Select from '@/Components/Ui/Select';
import { TextInput } from '@/Components/Ui/TextInput';
import { ColumnName } from '@/MockData/Pages/VewiCreation/data';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addAggregation,
  removeAggregation,
  updateGroupBy,
} from './VeiwSlice/groupBySlice';
import { operationOptions } from './VeiwSlice/interface';

const GroupBy = ({
  setComponentsId,
}: {
  setComponentsId: (id: string) => void;
}) => {
  const dispatch = useDispatch();
  const groupBy = useSelector((state: any) => state?.groupBy.groupBy);

  const handleSelectedColumns = (
    selectedColumns: string,
    groupdetailsId: number
  ) => {
    const selectedColumn = ColumnName.find(
      (column) => column.value === selectedColumns
    );

    if (selectedColumn) {
      dispatch(
        updateGroupBy({
          id: groupdetailsId,
          field: 'columnName',
          value: selectedColumn.columnNames,
        })
      );
      dispatch(
        updateGroupBy({
          id: groupdetailsId,
          field: 'columnId',
          value: selectedColumn.columnId,
        })
      );
      dispatch(
        updateGroupBy({
          id: groupdetailsId,
          field: 'columnType',
          value: selectedColumn.columnType,
        })
      );
      dispatch(
        updateGroupBy({
          id: groupdetailsId,
          field: 'tableName',
          value: selectedColumn.tableName,
        })
      );
      dispatch(
        updateGroupBy({
          id: groupdetailsId,
          field: 'tableId',
          value: selectedColumn.tableId,
        })
      );
    }
  };
  const handleSelectedOperation = (
    selectedOption: string,
    groupdetailsId: number
  ) => {
    if (
      selectedOption !== null &&
      selectedOption !== undefined &&
      selectedOption !== ''
    ) {
      dispatch(
        updateGroupBy({
          id: groupdetailsId,
          field: 'operatorName',
          value: selectedOption,
        })
      );
    }
  };

  const handleInputChange = (id: number, field: any, value: string) => {
    dispatch(updateGroupBy({ id, field, value }));
  };

  return (
    <>
      {groupBy.map((groupDetails: any) => (
        <div className="flex gap-10" key={groupDetails?.id}>
          <div>
            <TextInput
              id={`resultColumnName-${groupDetails.id}`}
              name={`resultColumnName-${groupDetails.id}`}
              helperText={false}
              height="35px"
              label={'New Column Name'}
              labelPosition={'top'}
              placeholder={''}
              width={'365px'}
              defaultValue={groupDetails?.resultColumnName || ''}
              onChange={(e) => {
                handleInputChange(
                  groupDetails.id,
                  'resultColumnName',
                  e.target.value
                );
              }}
            />
          </div>
          <div className="w-[366px]">
            <Select
              id={`operation-${groupDetails.id}`}
              label={'Operation'}
              labelPosition="top"
              height="35px"
              width="366px"
              helperText={false}
              options={operationOptions.map((option) => ({
                value: option.value,
                label: option.label,
              }))}
              defaultValue={groupDetails?.operatorName || ''}
              placeholder="Select Option"
              onSelect={(selectedOption: any) => {
                handleSelectedOperation(
                  selectedOption ? selectedOption.value : null,
                  groupDetails.id
                );
              }}
            />
          </div>
          <div className="w-[366px]">
            <Select
              id={`column-${groupDetails.id}`}
              label={'Column'}
              labelPosition="top"
              height="35px"
              width="366px"
              helperText={false}
              placeholder="Select Column"
              defaultValue={groupDetails?.columnName || ''}
              options={ColumnName.map((col) => ({
                value: col.value,
                label: col.label,
              }))}
              onSelect={(selectedoption: any) => {
                handleSelectedColumns(selectedoption.value, groupDetails.id);
              }}
            />
          </div>
          {groupDetails.id > 1 && (
            <div className="pt-10">
              <button
                onClick={() => dispatch(removeAggregation(groupDetails.id))}
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
              </button>
            </div>
          )}
        </div>
      ))}

      <div
        className="pt-4 w-[100px] flex items-center gap-2 cursor-pointer"
        onClick={() => dispatch(addAggregation())}
      >
        <div>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.9993 6.83073H6.83268V10.9974C6.83268 11.2184 6.74488 11.4304 6.5886 11.5867C6.43232 11.7429 6.22036 11.8307 5.99935 11.8307C5.77834 11.8307 5.56637 11.7429 5.41009 11.5867C5.25381 11.4304 5.16602 11.2184 5.16602 10.9974V6.83073H0.999349C0.778335 6.83073 0.566374 6.74293 0.410093 6.58665C0.253813 6.43037 0.166016 6.21841 0.166016 5.9974C0.166016 5.77638 0.253813 5.56442 0.410093 5.40814C0.566374 5.25186 0.778335 5.16406 0.999349 5.16406H5.16602V0.997396C5.16602 0.776382 5.25381 0.56442 5.41009 0.40814C5.56637 0.25186 5.77834 0.164062 5.99935 0.164062C6.22036 0.164062 6.43232 0.25186 6.5886 0.40814C6.74488 0.56442 6.83268 0.776382 6.83268 0.997396V5.16406H10.9993C11.2204 5.16406 11.4323 5.25186 11.5886 5.40814C11.7449 5.56442 11.8327 5.77638 11.8327 5.9974C11.8327 6.21841 11.7449 6.43037 11.5886 6.58665C11.4323 6.74293 11.2204 6.83073 10.9993 6.83073Z"
              fill="#1D57C7"
            />
          </svg>
        </div>

        <div>Aggregations</div>
      </div>
      <div className="flex gap-3 pt-14 pb-4 float-right pr-9">
        <Button
          type="button"
          name={'Cancel'}
          onClick={() => setComponentsId('0')}
        />
        <Button type="submit" name={'SaveDraft'} />
        <Button type="button" name={'Save'} />
      </div>
    </>
  );
};

export default React.memo(GroupBy);
