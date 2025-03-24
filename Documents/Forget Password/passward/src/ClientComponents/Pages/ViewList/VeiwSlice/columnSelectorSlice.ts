import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { ColumnsDatas } from '@/MockData/Pages/VewiCreation/data';

interface ColumnSelectorState {
  toggle: boolean;
  selectedTables: number | null;
  columnDataPushed: string[];
  associatedData: {
    columns: typeof ColumnsDatas;
  };
  searchTerm: string;
  filteredColumns: typeof ColumnsDatas;
  iconGroupHover: {
    parentIndex: number | null;
    childIndex: number | null;
  };
  columnTypeHoverEffect: number | null;
}

const initialState: ColumnSelectorState = {
  toggle: true,
  selectedTables: null,
  columnDataPushed: [],
  associatedData: {
    columns: ColumnsDatas,
  },
  searchTerm: '',
  filteredColumns: ColumnsDatas,
  iconGroupHover: {
    parentIndex: null,
    childIndex: null,
  },
  columnTypeHoverEffect: null,
};

const columnSelectorSlice = createSlice({
  name: 'columnSelector',
  initialState,
  reducers: {
    setToggle: (state, action: PayloadAction<boolean>) => {
      state.toggle = action.payload;
    },
    setSelectedTables: (state, action: PayloadAction<number | null>) => {
      state.selectedTables = action.payload;
    },
    addColumnDataPushed: (state, action: PayloadAction<string>) => {
      state.columnDataPushed.push(action.payload);
    },
    removeColumnDataPushed: (state, action: PayloadAction<number>) => {
      const removedColumn = state.columnDataPushed[action.payload];
      state.columnDataPushed.splice(action.payload, 1);
      state.filteredColumns.push({
        type: removedColumn,
        id: action.payload,
      });
    },
    clearSelectedColumn: (state, action: PayloadAction<number>) => {
      state.columnDataPushed = state.columnDataPushed.filter(
        (id) => id !== String(action.payload)
      );
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },

    moveColumn: (
      state,
      action: PayloadAction<{
        item: string;
        source: 'left' | 'right';
        id?: any;
      }>
    ) => {
      const { item, source } = action.payload;
      if (source === 'left') {
        state.filteredColumns = state.filteredColumns.filter(
          (column) => column.type !== item
        );
        state.columnDataPushed.push(item);
      } else {
        state.columnDataPushed = state.columnDataPushed.filter(
          (column) => column !== item
        );
        state.filteredColumns.push({
          type: item,
          id: action.payload.id,
        });
      }
    },
    setIconGroupHover: (
      state,
      action: PayloadAction<{
        parentIndex: number | null;
        childIndex: number | null;
      }>
    ) => {
      state.iconGroupHover = action.payload;
    },
    setColumnTypeHoverEffect: (state, action: PayloadAction<number | null>) => {
      state.columnTypeHoverEffect = action.payload;
    },
  },
});

export const {
  setToggle,
  setSelectedTables,
  addColumnDataPushed,
  removeColumnDataPushed,
  setSearchTerm,
  moveColumn,
  setIconGroupHover,
  setColumnTypeHoverEffect,
  clearSelectedColumn,
  
} = columnSelectorSlice.actions;

export default columnSelectorSlice.reducer;
