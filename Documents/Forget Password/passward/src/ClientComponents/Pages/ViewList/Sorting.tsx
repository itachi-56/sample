'use client';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@/Components/Ui/Button';
import SortingOption from './SortingOption';
import React, { useRef, useState } from 'react';
import {
  reorderSortOptions,
  addSortOption,
  removeSortOption,
  SortOption,
} from './VeiwSlice/sortingSlice';
import { filtersdata } from './VeiwSlice/interface';

export const Sorting: React.FC<{ setComponentsId: (id: string) => void }> = ({
  setComponentsId,
}) => {
  const dispatch = useDispatch();
  const sortOptions = useSelector((state: any) => state.sorting.sortOptions);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const dragNode = useRef<HTMLDivElement | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    setDraggingId(id);
    dragNode.current = e.target as HTMLDivElement;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id);
    setTimeout(() => {
      if (dragNode.current) dragNode.current.style.opacity = '0.5';
    }, 0);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetId: string) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text');
    const draggedIndex = sortOptions.findIndex(
      (option: { id: any }) => String(option.id) === draggedId
    );
    const targetIndex = sortOptions.findIndex(
      (option: { id: any }) => String(option.id) === targetId
    );

    if (draggedIndex === targetIndex) return;

    const newSortOptions = [...sortOptions];
    const [reorderedItem] = newSortOptions.splice(draggedIndex, 1);
    newSortOptions.splice(targetIndex, 0, reorderedItem);

    dispatch(reorderSortOptions(newSortOptions));
    setDraggingId(null);
    if (dragNode.current) dragNode.current.style.opacity = '1';
  };

  const handleDragEnd = () => {
    setDraggingId(null);
    if (dragNode.current) dragNode.current.style.opacity = '1';
    dragNode.current = null;
  };

  return (
    <>
      <div className="flex gap-7 pb-6">
        <div className="w-full max-w-2xl bg-white veiw-Designer-screen rounded-lg p-6 ">
          <h2 className="text-xl font-semibold mb-4">Column Name</h2>

          <div className="space-y-4">
            {sortOptions.map((option: SortOption, index: number) => (
              <SortingOption
                key={option.id}
                option={option}
                index={index}
                filtersdata={filtersdata}
              />
            ))}
            <button
              className="text-blue-600 hover:text-blue-800 font-semibold"
              onClick={() => dispatch(addSortOption())}
            >
              + Add a sort
            </button>
          </div>
        </div>
        <div className="w-full max-w-2xl bg-white view-Designer-screen rounded-lg p-6">
          <div>Active Sort Criteria</div>
          {sortOptions.length > 1 ? (
            <div className="flex flex-col gap-5 pt-3">
              {sortOptions
                .filter(
                  (option: { selectedColumn: string }) =>
                    option.selectedColumn && option.selectedColumn.trim() !== ''
                )
                .map((option: any) => (
                  <div
                    key={option.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, String(option.id))}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, String(option.id))}
                    onDragEnd={handleDragEnd}
                    className={`h-[40px] w-[400px] border-[1px] border-[#D9D9D9] ${
                      draggingId === String(option.id) ? 'opacity-50' : ''
                    }`}
                  >
                    <div className="flex justify-between px-6 items-center h-full cursor-move">
                      <div className="flex gap-2 items-center justify-center">
                        <svg
                          width="10"
                          height="12"
                          viewBox="0 0 10 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.33333 7.21487C9.33333 7.32221 9.28864 7.42516 9.20908 7.50106C9.12951 7.57697 9.02161 7.61961 8.90909 7.61961H5.09091V10.2853L6.06348 9.35695C6.14309 9.281 6.25106 9.23834 6.36364 9.23834C6.47621 9.23834 6.58418 9.281 6.66379 9.35695C6.74339 9.4329 6.78812 9.5359 6.78812 9.6433C6.78812 9.75071 6.74339 9.85371 6.66379 9.92966L4.96682 11.5486C4.92742 11.5862 4.88063 11.6161 4.82913 11.6365C4.77762 11.6568 4.72242 11.6673 4.66667 11.6673C4.61091 11.6673 4.55571 11.6568 4.50421 11.6365C4.4527 11.6161 4.40592 11.5862 4.36651 11.5486L2.66955 9.92966C2.58994 9.85371 2.54522 9.75071 2.54522 9.6433C2.54522 9.5359 2.58994 9.4329 2.66955 9.35695C2.74915 9.281 2.85712 9.23834 2.9697 9.23834C3.08228 9.23834 3.19024 9.281 3.26985 9.35695L4.24242 10.2853V7.61961H0.424242C0.311726 7.61961 0.203819 7.57697 0.124258 7.50106C0.0446969 7.42516 0 7.32221 0 7.21487C0 7.10752 0.0446969 7.00458 0.124258 6.92867C0.203819 6.85277 0.311726 6.81013 0.424242 6.81013H8.90909C9.02161 6.81013 9.12951 6.85277 9.20908 6.92867C9.28864 7.00458 9.33333 7.10752 9.33333 7.21487Z"
                            fill="#889ABC"
                          />
                        </svg>
                        <div>
                          {option.selectedColumn}
                          <span className="pl-2">{option.sortDirection}</span>
                        </div>
                      </div>
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => dispatch(removeSortOption(option.id))}
                        className="cursor-pointer"
                      >
                        <path
                          d="M10 1.00714L8.99286 0L5 3.99286L1.00714 0L0 1.00714L3.99286 5L0 8.99286L1.00714 10L5 6.00714L8.99286 10L10 8.99286L6.00714 5L10 1.00714Z"
                          fill="#889ABC"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="flex flex-col gap-5 pt-3 items-center">
              <svg
                width="21"
                height="23"
                viewBox="0 0 21 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.29172 6.04214L3.96922 4.36464V12.1884C3.96922 12.7521 4.43672 13.2196 5.00047 13.2196C5.56422 13.2196 6.03172 12.7521 6.03172 12.1884V4.36464L7.70922 6.04214C7.91547 6.24839 8.17672 6.34464 8.43797 6.34464C8.69922 6.34464 8.96047 6.24839 9.16672 6.04214C9.56547 5.64339 9.56547 4.98339 9.16672 4.58464L5.72922 1.14714C5.63346 1.05441 5.52164 0.97987 5.39922 0.927136C5.27589 0.872161 5.14237 0.84375 5.00734 0.84375C4.87232 0.84375 4.7388 0.872161 4.61547 0.927136C4.49172 0.982136 4.38172 1.05089 4.28547 1.14714L0.847969 4.58464C0.449219 4.98339 0.449219 5.64339 0.847969 6.04214C1.24672 6.44089 1.90672 6.44089 2.30547 6.04214H2.29172ZM18.7092 16.9596L17.0317 18.6371V10.8134C17.0317 10.2496 16.5642 9.78214 16.0005 9.78214C15.4367 9.78214 14.9692 10.2496 14.9692 10.8134V18.6371L13.2917 16.9596C12.893 16.5609 12.233 16.5609 11.8342 16.9596C11.4355 17.3584 11.4355 18.0184 11.8342 18.4171L15.2717 21.8546C15.4674 22.0444 15.7279 22.1526 16.0005 22.1571C16.273 22.1526 16.5336 22.0444 16.7292 21.8546L20.1667 18.4171C20.5655 18.0184 20.5655 17.3584 20.1667 16.9596C19.768 16.5609 19.108 16.5609 18.7092 16.9596ZM20.1667 3.29214C20.5655 2.89339 20.5655 2.23339 20.1667 1.83464C19.768 1.43589 19.108 1.43589 18.7092 1.83464L17.0317 3.51214V1.87589C17.0317 1.31214 16.5642 0.844636 16.0005 0.844636C15.4367 0.844636 14.9692 1.31214 14.9692 1.87589V5.57464L0.834219 19.7096C0.435469 20.1084 0.435469 20.7684 0.834219 21.1671C1.04047 21.3734 1.30172 21.4696 1.56297 21.4696C1.82422 21.4696 2.08547 21.3734 2.29172 21.1671L3.96922 19.4896V21.1259C3.96922 21.6896 4.43672 22.1571 5.00047 22.1571C5.56422 22.1571 6.03172 21.6896 6.03172 21.1259V17.4271L20.1667 3.29214Z"
                  fill="#889ABC"
                  fillOpacity="0.28"
                />
              </svg>
              <div>No Sort Criteria Selected</div>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3 pb-5 float-right pr-5 ">
        <Button
          type="button"
          name={'Cancel'}
          onClick={() => setComponentsId('0')}
        />

        <Button type="submit" name={'SaveDraft'} />
        <Button
          type="button"
          name={'Next'}
          onClick={() => setComponentsId('04')}
        />
      </div>
    </>
  );
};

export default React.memo(Sorting);
