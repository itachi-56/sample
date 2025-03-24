import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface SortOption {
  id: number;
  selectedColumn: string;
  sortDirection: 'asc' | 'desc';
}

interface SortingState {
  sortOptions: SortOption[];
  nextId: number;
}

const initialState: SortingState = {
  sortOptions: [{ id: 0, selectedColumn: '', sortDirection: 'asc' }],
  nextId: 1,
};

const sortingSlice = createSlice({
  name: 'sorting',
  initialState,
  reducers: {
    addSortOption: (state) => {
      if (state.sortOptions.some((option) => option.selectedColumn === '')) {
        return;
      }
      state.sortOptions.push({
        id: state.nextId,
        selectedColumn: '',
        sortDirection: 'asc',
      });
      state.nextId += 1;
    },
    removeSortOption: (state, action: PayloadAction<number>) => {
      state.sortOptions = state.sortOptions.filter(
        (option) => option.id !== action.payload
      );
    },
    updateSortingDetails: (
      state,
      action: PayloadAction<{ id: number; details: string }>
    ) => {
      const { id, details } = action.payload;
      if (details !== '' && details !== undefined && details !== null) {
        const optionIndex = state.sortOptions.findIndex((opt) => opt.id === id);
        if (optionIndex !== -1) {
          state.sortOptions[optionIndex].selectedColumn = details || '';
        }
      }
    },
    toggleSortDirection: (state, action: PayloadAction<number>) => {
      const optionIndex = state.sortOptions.findIndex(
        (opt) => opt.id === action.payload
      );
      if (optionIndex !== -1) {
        state.sortOptions[optionIndex].sortDirection =
          state.sortOptions[optionIndex].sortDirection === 'asc'
            ? 'desc'
            : 'asc';
      }
    },
    reorderSortOptions: (state, action: PayloadAction<SortOption[]>) => {
      state.sortOptions = action.payload;
    },
  },
});

export const {
  addSortOption,
  removeSortOption,
  updateSortingDetails,
  toggleSortDirection,
  reorderSortOptions,
} = sortingSlice.actions;

export default sortingSlice.reducer;
