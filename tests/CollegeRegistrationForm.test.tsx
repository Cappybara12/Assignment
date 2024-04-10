import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../src/redux/store.ts';
import CollegeRegistrationForm from '../src/components/CollegeRegistrationForm.tsx';
import '@testing-library/jest-dom';

describe('CollegeRegistrationForm', () => {
  test('should render the form', () => {
    const { getByText } = render(
      <Provider store={store}>
        <CollegeRegistrationForm />
      </Provider>
    );
    expect(getByText('College Registration Form')).toBeInTheDocument();
  });

  test('should submit the form', async () => {
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <CollegeRegistrationForm />
      </Provider>
    );

    fireEvent.change(getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(getByLabelText('Phone'), { target: { value: '555-1234' } });
    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(store.getState().registration.registrations.length).toBe(1);
    });
  });

  // Add more tests for editing, deleting, and other functionalities
});