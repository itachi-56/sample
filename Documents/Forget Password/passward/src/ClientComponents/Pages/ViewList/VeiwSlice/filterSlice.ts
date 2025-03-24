import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

interface FilterType {
  id: string;
  isChild: boolean;
  tableId: string;
  tableName: string;
  columnId: string;
  columnName: string;
  operator: string;
  selectedColumn: string;
  selectedFilterConditionValue: string;
  inputValues: Record<string, any>;
  children?: FilterType[];
}

interface FilterState {
  filters: FilterType[];
}

const initialState: FilterState = {
  filters: [],
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    addFilter: (
      state,
      action: PayloadAction<{ parentId: string ; isGroup: boolean }>
    ) => {
      const { parentId, isGroup } = action.payload;
      const newFilter: any = isGroup
        ? {
            isChild: true,
            id: uuidv4(),
            operator: 'AND',
            children: [
              {
                id: uuidv4(),
                selectedColumn: '',
                selectedFilterConditionValue: '',
                inputValues: {},
                tableId: "",
                tableName: "",
                columnId: "",
                columnName:"",
               
              },
            ],
          }
        : {
            isChild: false,
            id: uuidv4(),
            operator: 'AND',
            selectedColumn: '',
            selectedFilterConditionValue: '',
            inputValues: {},
            tableId: "",
            tableName: "",
            columnId: "",
            columnName:"",
          };

      if (parentId) {
        const addFilterRecursively = (filters: FilterType[]): FilterType[] => {
          return filters.map((filter) => {
            if (filter.id === parentId) {
              return {
                ...filter,
                children: [...(filter.children || []), newFilter],
              };
            }
            if (filter.children) {
              return {
                ...filter,
                children: addFilterRecursively(filter.children),
              };
            }
            return filter;
          });
        };
        state.filters = addFilterRecursively(state.filters);
      } else {
        state.filters.push(newFilter);
      }
    },
    deleteFilter: (state, action: PayloadAction<string>) => {
      const deleteFilterRecursively = (filters: FilterType[]): FilterType[] => {
        return filters.filter((filter) => {
          if (filter.id === action.payload) {
            return false;
          }
          if (filter.children) {
            filter.children = deleteFilterRecursively(filter.children);
            if (filter.children.length === 0) {
              return false;
            }
          }
          return true;
        });
      };

      state.filters = deleteFilterRecursively(state.filters);
      if (state.filters.length === 0) {
        state.filters = [
          {
            isChild: false,
            id: uuidv4(),
            operator: 'AND',
            selectedColumn: '',
            selectedFilterConditionValue: '',
            inputValues: {},
            tableId: "",
            tableName: "",
            columnId: "",
            columnName:"",
          },
        ];
      }
    },
    updateFilter: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<FilterType> }>
    ) => {
      const { id, updates } = action.payload;
      const updateFilterRecursively = (filters: FilterType[]): FilterType[] => {
        return filters.map((filter) => {
          if (filter.id === id) {
            return { ...filter, ...updates };
          }
          if (filter.children) {
            return {
              ...filter,
              children: updateFilterRecursively(filter.children),
            };
          }
          return filter;
        });
      };
      state.filters = updateFilterRecursively(state.filters);
    },
  },
});

export const { addFilter, deleteFilter, updateFilter } = filterSlice.actions;
export default filterSlice.reducer;
