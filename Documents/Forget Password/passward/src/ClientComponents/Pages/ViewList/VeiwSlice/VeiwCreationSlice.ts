import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ViewCreationState {
  viewName: string;
  description: string;
  formName: string;
  primaryKey: string;
  isDefault: boolean;
  isGrouping: boolean;
  currentStep: string;
}

const initialState: ViewCreationState = {
  viewName: '',
  description: '',
  formName: '',
  primaryKey: 'Primary Table',
  isDefault: false,
  isGrouping: false,
  currentStep: '0',
};

const viewCreationSlice = createSlice({
  name: 'viewCreation',
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{ name: string; value: string | boolean }>
    ) => {
      const { name, value } = action.payload;
      return { ...state, [name]: value };
    },
    setCurrentStep: (state, action: PayloadAction<string>) => {
      state.currentStep = action.payload;
    },
  },
});

export const { updateField, setCurrentStep } = viewCreationSlice.actions;
export default viewCreationSlice.reducer;
