'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { TextInput } from './TextInput';
import Select from './Select';
import Button from './Button';
import { PaginationInterface } from '../ClassName/Pagination';

const selectData = [
  { label: '2', value: '2' },
  { label: '4', value: '4' },
];

const Pagination = ({
  showPerPage = true,
  showPageChange = true,
  showGotoPage = true,
  dataCount,
  goToPage,
  getPerPage,
  getCurrentPage,
}: PaginationInterface) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDataCount, setDataCount] = useState(0);
  const [dataPerPage, setDataperPage] = useState(2);
  const [, setGotoPage] = useState(0);
  const firstPage = 1;
  const lastPage = Math.ceil(totalDataCount / dataPerPage);

  useEffect(() => {
    getPerPage(dataPerPage);
    getCurrentPage(currentPage);
  }, [dataPerPage, currentPage]);

  useEffect(() => {
    setDataCount(dataCount);
  }, [dataCount]);

  const gotoPageFunc = (e: ChangeEvent<HTMLInputElement>) => {
    if (typeof Number(e.target.value) === 'number') {
      setGotoPage(Number(e.target.value));
      goToPage();
    }
  };

  return (
    <div className="flex gap-4 items-center text-nowrap text-lg">
      {showPerPage && (
        <div className="flex gap-3 items-center">
          <div>Per page</div>
          <Select
            id={'per-page'}
            name={'per_page'}
            read_only={true}
            height="40px"
            onSelect={(e: { label: string; value: string }) => {
              setDataperPage(Number(e.value));
            }}
            options={selectData}
            width="80px"
            label={''}
            labelPosition={'top'}
            helperText={false}
          />
          <div className="flex gap-2">
            <div>{`${(currentPage - 1) * dataPerPage + 1}-${currentPage * dataPerPage > totalDataCount ? totalDataCount : currentPage * dataPerPage}`}</div>
            <div>of</div>
            <div>{totalDataCount}</div>
          </div>
        </div>
      )}
      {showPageChange && (
        <div className="flex gap-1 items-center cursor-pointer">
          <button
            className="px-2"
            disabled={firstPage === currentPage ? true : false}
            onClick={() => {
              setCurrentPage(1);
            }}
          >
            {' '}
            <i className="icon-left-double-arrow"></i>
          </button>
          <button
            className="px-2"
            disabled={firstPage === currentPage ? true : false}
            onClick={() => {
              setCurrentPage((prew) => prew - 1);
            }}
          >
            <i className="icon-left-sigle-arrow"></i>
          </button>
          <button
            className="px-2"
            disabled={lastPage === currentPage ? true : false}
            onClick={() => {
              setCurrentPage((prew) => prew + 1);
            }}
          >
            <i className="icon-right-single-arrow"></i>
          </button>
          <button
            className="px-2"
            disabled={lastPage === currentPage ? true : false}
            onClick={() => {
              setCurrentPage(lastPage);
            }}
          >
            <i className="icon-right-double-arrow"></i>
          </button>
        </div>
      )}
      {showGotoPage && (
        <div className="h-full flex gap-3 items-center">
          <div>Go to page</div>
          <div className="">
            <TextInput
              maxLength={5}
              id={'goto-page'}
              name={'goto_page'}
              height="40px"
              width="80px"
              label={''}
              onChange={(e) => {
                gotoPageFunc(e);
              }}
              labelPosition={'top'}
              placeholder=""
              helperText={false}
            />
          </div>

          <Button name={'Go'} iconPosition="left" />
        </div>
      )}
    </div>
  );
};

export default Pagination;
