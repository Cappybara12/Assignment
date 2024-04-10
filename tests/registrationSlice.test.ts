import registrationReducer, { createRegistration, updateRegistration, deleteRegistration } from '../src/redux/registrationSlice';
import { RegistrationFormData } from '../src/types/registration';

describe('registrationSlice', () => {
  test('should create a new registration', () => {
    const initialState = { registrations: [] };
    const newRegistration: RegistrationFormData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '555-1234',
      address: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
      degree: 'Bachelor of Science',
      major: 'Computer Science',
      gradYear: '2024',
    };

    const state = registrationReducer(initialState, createRegistration(newRegistration));
    expect(state.registrations.length).toBe(1);
    expect(state.registrations[0]).toEqual({ ...newRegistration, id: expect.any(String) });
  });

  test('should update a registration', () => {
    const initialState = {
      registrations: [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          phone: '555-1234',
          address: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zip: '12345',
          degree: 'Bachelor of Science',
          major: 'Computer Science',
          gradYear: '2024',
        },
      ],
    };

    const updatedRegistration = {
      id: '1',
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '555-5678',
      address: '456 Oak St',
      city: 'Othertown',
      state: 'NY',
      zip: '54321',
      degree: 'Bachelor of Arts',
      major: 'English',
      gradYear: '2025',
    };

    const state = registrationReducer(initialState, updateRegistration(updatedRegistration));
    expect(state.registrations.length).toBe(1);
    expect(state.registrations[0]).toEqual(updatedRegistration);
  });

  test('should delete a registration', () => {
    const initialState = {
      registrations: [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          phone: '555-1234',
          address: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zip: '12345',
          degree: 'Bachelor of Science',
          major: 'Computer Science',
          gradYear: '2024',
        },
        {
          id: '2',
          name: 'Jane Doe',
          email: 'jane@example.com',
          phone: '555-5678',
          address: '456 Oak St',
          city: 'Othertown',
          state: 'NY',
          zip: '54321',
          degree: 'Bachelor of Arts',
          major: 'English',
          gradYear: '2025',
        },
      ],
    };

    const state = registrationReducer(initialState, deleteRegistration('1'));
    expect(state.registrations.length).toBe(1);
    expect(state.registrations[0].id).toBe('2');
  });
});