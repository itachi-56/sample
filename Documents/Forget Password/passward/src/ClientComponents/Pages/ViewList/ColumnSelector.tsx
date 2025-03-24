'use client';

import type React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@/Components/Ui/Button';
import { associatedType } from '@/MockData/Pages/VewiCreation/data';
import {
  setToggle,
  setSelectedTables,
  setIconGroupHover,
  moveColumn,
  setColumnTypeHoverEffect,
  removeColumnDataPushed,
  addColumnDataPushed,
  setSearchTerm,
  clearSelectedColumn,
} from './VeiwSlice/columnSelectorSlice';
import {
  SearchIcon,
  ColumHoverEffectIcon,
  DownArrowicon,
  ToggleDatPushedicon,
  SelctedcolumnHoverIcons,
  CancelIcon,
} from '../ViewList/icons';

export const ColumnSelector = ({
  setComponentsId,
}: {
  setComponentsId: (id: string) => void;
}) => {
  const [handleClickedSelectedColumsType, setHandleClickedSelectedColumsType] =
    useState<string[]>([]);

  const dispatch = useDispatch();
  const {
    toggle,
    selectedTables,
    columnDataPushed,
    searchTerm,
    SearchTable,
    iconGroupHover,
    columnTypeHoverEffect,
  } = useSelector((state: any) => state.columnSelector);

  const toggleBackgroundColor = () => {
    dispatch(setToggle(!toggle));
  };

  const handleTableClick = (tableIndex: number) => {
    dispatch(setSelectedTables(tableIndex));
  };

  const groupHoverEffect = (parentIndex: number, childIndex: number) => {
    dispatch(setIconGroupHover({ parentIndex, childIndex }));
  };
  console.log('SearchTable', SearchTable);
  const handleDragStart = (
    event: React.DragEvent,
    item: any,
    source: 'left' | 'right'
  ) => {
    event.dataTransfer.setData('text/plain', JSON.stringify({ item, source }));
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    const { item, source } = JSON.parse(data);

    dispatch(moveColumn({ item: item.type || item, source }));
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const ColumnHoverEffect = (id: number) => {
    dispatch(setColumnTypeHoverEffect(id));
  };

  const RemoveUniqueSelectedColumns = (index: number) => {
    dispatch(removeColumnDataPushed(index));
  };

  const handleSelectedColumns = (columnType: string, id: number) => {
    if (!handleClickedSelectedColumsType.includes(columnType)) {
      setHandleClickedSelectedColumsType((prev) => [...prev, columnType]);
      dispatch(clearSelectedColumn(id));
    } else {
      console.error('Column type already exists:', columnType);
    }

    setTimeout(() => {
      dispatch(moveColumn({ item: columnType, source: 'left', id: id }));
    }, 2000);
  };

  const handleToggeDataPushed = () => {
    handleClickedSelectedColumsType.forEach((columnType: string) => {
      dispatch(addColumnDataPushed(columnType));
    });
    setHandleClickedSelectedColumsType([]);
  };
  const filteredColumn = useSelector((state: any) =>
    state.columnSelector.filteredColumns.filter((column: { type: string }) =>
      column.type
        .toLowerCase()
        .includes(state.columnSelector.searchTerm.toLowerCase())
    )
  );

  return (
    <>
      <div className="text-[17px] font-semibold lato text-[#363F51]">
        ColumnSelector{`(Primary Table Name)`}
      </div>
      <div className="pt-4">
        <div className="h-[28px] w-[300px] flex justify-center items-center  bg-[#F6F7F8] rounded-[5px]">
          <div
            className={`${
              toggle ? 'text-[#5E636D] bg-white ' : ''
            } w-[48%] flex items-center justify-center h-[22px] lato text-[13px] font-bold cursor-pointer`}
            onClick={toggleBackgroundColor}
          >
            Columns
          </div>
          <div
            className={`${
              !toggle ? ' text-[#5E636D] bg-white ' : ''
            } w-[48%] flex items-center justify-center h-[22px] lato text-[13px] font-bold cursor-pointer`}
            onClick={toggleBackgroundColor}
          >
            Associated
          </div>
        </div>
      </div>

      <div className="flex gap-56 pt-[11px]">
        <div className="font-semibold text-[15px] lato text-[#363F51]">
          Available Columns
        </div>

        <div className="h-[28px] w-[197px] bg-[#F6F7F9] rounded-[6px] overflow-hidden flex items-center justify-center">
          <div className="h-full w-[20%] flex items-center justify-center ">
            <SearchIcon />
          </div>

          <div>
            <div className="h-full w-[80%]">
              <input
                type="text"
                className="focus:outline-none h-full bg-[#F6F7F9] w-full text-[14px] font-[510] lato text-[#889ABC]"
                placeholder="Search Control..."
                value={toggle == true ? searchTerm : SearchTable}
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pb-5 pt-2 flex gap-4 items-center">
        <div
          className="w-[550px] h-[583px] veiw-Designer-screen pb-6 pt-6"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'left')}
        >
          {toggle ? (
            <div className="flex flex-col gap-3 ">
              {filteredColumn.map((columnType: any, id: number) => (
                <div
                  key={id}
                  className="w-[500px] h-[45px] border flex items-center pt-3 mx-auto group"
                  onMouseEnter={() => ColumnHoverEffect(id)}
                  onClick={() => handleSelectedColumns(columnType.type, id)}
                  draggable
                  onDragStart={(event) =>
                    handleDragStart(event, columnType, 'left')
                  }
                >
                  <div className="w-[50px] flex justify-center">
                    {columnTypeHoverEffect === id && <ColumHoverEffectIcon />}
                  </div>

                  <div className="w-[450px] text-[14px] font-medium lato text-[#5E636D] group-hover:text-[#1D57C7]">
                    {columnType.type}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-6 ">
              {Object.keys(associatedType).map((tableName, tableIndex) => (
                <div key={tableIndex} className="flex flex-col justify-center">
                  <div
                    className="flex items-center "
                    onClick={() => handleTableClick(tableIndex)}
                  >
                    <div className="w-[50px] flex justify-center">
                      <DownArrowicon />
                    </div>
                    <div className="w-[450px]">{tableName}</div>
                  </div>

                  {selectedTables == tableIndex && (
                    <div className="flex flex-col gap-3 pl-4">
                      {associatedType[tableName]?.map(
                        (
                          column: { ColumnId: any; type: any },
                          columnIndex: number
                        ) => (
                          <div
                            key={columnIndex}
                            className="w-[500px] h-[45px] border flex items-center pt-3 group"
                            onMouseEnter={() =>
                              groupHoverEffect(tableIndex, columnIndex)
                            }
                          >
                            <div className="w-[50px] flex justify-center ">
                              {iconGroupHover.parentIndex == tableIndex &&
                                iconGroupHover.childIndex == columnIndex && (
                                  <ColumHoverEffectIcon />
                                )}
                            </div>

                            <div className="w-[450px] text-[14px] font-medium lato text-[#5E636D] group-hover:text-[#1D57C7] ">
                              {' '}
                              {column.type}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="cursor-pointer" onClick={handleToggeDataPushed}>
          <ToggleDatPushedicon />
        </div>

        <div
          className="w-[550px] relative h-[583px] veiw-Designer-screen flex flex-col items-center gap-3 pb-6 cursor-pointer pt-6"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e)}
        >
          <div className="absolute top-[-35px] left-0 font-semibold text-[15px] lato text-[#363F51]">
            Selected Columns
          </div>
          {columnDataPushed.length > 0 &&
            columnDataPushed.map(
              (
                SelctedColumns:
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | Promise<React.AwaitedReactNode>
                  | null
                  | undefined,
                index: React.Key | null | undefined
              ) => (
                <div
                  className="w-[500px] h-[45px] border flex items-center pt-3 mx-auto group cursor-pointer"
                  key={index}
                  draggable
                  onDragStart={(event) =>
                    handleDragStart(event, SelctedColumns, 'right')
                  }
                >
                  <div className="w-[50px] flex justify-center ">
                    <SelctedcolumnHoverIcons />
                  </div>

                  <div className="w-[400px] text-[14px] font-medium lato text-[#5E636D] group-hover:text-[#1D57C7]">
                    {SelctedColumns}
                  </div>
                  <div className="w-[50px]">
                    <CancelIcon
                      RemoveSpecificColumn={() =>
                        RemoveUniqueSelectedColumns(Number(index))
                      }
                    />
                  </div>
                </div>
              )
            )}
        </div>
      </div>
      <div className="flex gap-3 pb-5 float-right pr-9 pt-1">
        <Button
          type="button"
          name={'Cancel'}
          onClick={() => setComponentsId('0')}
        />

        <Button type="submit" name={'SaveDraft'} />
        <Button
          type="button"
          name={'Next'}
          onClick={() => setComponentsId('02')}
        />
      </div>
    </>
  );
};
