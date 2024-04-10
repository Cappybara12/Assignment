import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegistrationFormData } from '../types/registration';

interface RegistrationState {
  registrations: RegistrationFormData[];
}

const initialState: RegistrationState = {
  registrations: [],
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    createRegistration: (state, action: PayloadAction<RegistrationFormData>) => {
      state.registrations.push({ ...action.payload, id: Date.now().toString() });
    },
    updateRegistration: (state, action: PayloadAction<RegistrationFormData>) => {
      const index = state.registrations.findIndex((r) => r.id === action.payload.id);
      if (index !== -1) {
        state.registrations[index] = action.payload;
      }
    },
    deleteRegistration: (state, action: PayloadAction<string>) => {
      state.registrations = state.registrations.filter((r) => r.id !== action.payload);
    },
  },
});

export const { createRegistration, updateRegistration, deleteRegistration } = registrationSlice.actions;
export default registrationSlice.reducer;