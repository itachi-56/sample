import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface GroupBy {
  id: number;
  operatorName: string;
  tableId: string;
  tableName: string;
  columnId: string;
  columnName: string;
  columnType: string;
  resultColumnName: string;
}

interface GroupByState {
  groupBy: GroupBy[];
}

const initialState: GroupByState = {
  groupBy: [
    {
      id: 1,
      operatorName: '',
      tableId: '',
      tableName: '',
      columnId: '',
      columnName: '',
      columnType: '',
      resultColumnName: '',
    },
  ],
};

const groupBySlice = createSlice({
  name: 'groupBy',
  initialState,
  reducers: {
    addAggregation: (state) => {
      const newGroupBy: GroupBy = {
        id: state.groupBy.length + 1,
        operatorName: '',
        tableId: '',
        tableName: '',
        columnId: '',
        columnName: '',
        columnType: '',
        resultColumnName: '',
      };
      state.groupBy.push(newGroupBy);
    },
    removeAggregation: (state, action: PayloadAction<number>) => {
      state.groupBy = state.groupBy.filter(
        (item) => item.id !== action.payload
      );
    },
    updateGroupBy: (
      state,
      action: PayloadAction<{ id: number; field: any; value: string }>
    ) => {
      const { id, field, value } = action.payload;
      const index = state.groupBy.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.groupBy[index] = { ...state.groupBy[index], [field]: value };
      }
    },
    setGroupBy: (state, action: PayloadAction<GroupBy[]>) => {
      state.groupBy = action.payload;
    },
  },
});

export const { addAggregation, removeAggregation, updateGroupBy, setGroupBy } =
  groupBySlice.actions;
export default groupBySlice.reducer;
