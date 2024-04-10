// src/store/slices/formSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  country: string;
  course: string;
}

interface FormState {
  formData: FormData;
}

const initialState: FormState = {
  formData: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    country: '',
    course: '',
  },
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFormData(state, action: PayloadAction<FormData>) {
      state.formData = action.payload;
    },
  },
});

export const { updateFormData } = formSlice.actions;
export default formSlice.reducer;
