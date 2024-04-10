// src/components/Form.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Form from './CollegeRegistrationForm';

test('Form component renders correctly', () => {
  const { getByLabelText, getByText } = render(
    <Provider store={store}>
      <Form />
    </Provider>
  );

  const firstNameInput = getByLabelText('First Name');
  fireEvent.change(firstNameInput, { target: { value: 'John' } });

  const submitButton = getByText('Submit');
  fireEvent.click(submitButton);

});
