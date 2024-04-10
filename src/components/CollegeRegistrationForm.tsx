import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateRegistration, createRegistration, deleteRegistration } from '../redux/registrationSlice';
import { RegistrationFormData } from '../types/registration';
import { generateMockData } from '../utils/faker';
import { RootState } from '../redux/store';
import DateField from './DateField';

// Abstract base class for form fields
abstract class FormField<T> {
  name: string;
  label: string;
  value: T;
  onChange: (value: T) => void;

  constructor(name: string, label: string, value: T, onChange: (value: T) => void) {
    this.name = name;
    this.label = label;
    this.value = value;
    this.onChange = onChange;
  }

  abstract render(): JSX.Element;
}

// Concrete form field components
class TextInputField extends FormField<string> {
  render() {
    return (
      <div>
        <label htmlFor={this.name} className="block font-bold mb-2">
          {this.label}
        </label>
        <input
          type="text"
          id={this.name}
          name={this.name}
          value={this.value}
          onChange={(e) => this.onChange(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full"
        />
      </div>
    );
  }
}
class DropdownField<T extends string | number> extends FormField<T> {
  options: { label: string; value: T }[];

  constructor(
    name: string,
    label: string,
    value: T,
    onChange: (value: T) => void,
    options: { label: string; value: T }[]
  ) {
    super(name, label, value, onChange);
    this.options = options;
  }

  render(): JSX.Element { // Ensure the return type is JSX.Element
    const { name, label, value, options, onChange } = this;

    if (value === undefined) {
      return <div>Error: Value is undefined</div>; // Or any other error handling
    }

    return (
      <div>
        <label htmlFor={name} className="block font-bold mb-2">
          {label}
        </label>
        <select
          id={name}
          name={name}
          value={value.toString()}
          onChange={(e) => onChange(e.target.value as T)}
          className="border rounded-lg px-4 py-2 w-full"
        >
          <option value="">Select an option</option>
          {options.map((option, index) => (
            <option key={index} value={option.value.toString()}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

const CollegeRegistrationForm: React.FC = () => {
  const dispatch = useDispatch();
  const registrations = useSelector((state: RootState) => state.registration.registrations);

  const [formData, setFormData] = useState<RegistrationFormData>({
    id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    degree: '',
    major: '',
    gradYear: new Date(),
    dateOfBirth: new Date(),
    gender: '',
    ethnicity: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(updateRegistration(formData));
    } else {
      dispatch(createRegistration(formData));
    }
    setFormData(generateMockData());
    setIsEditing(false);
  };

  const handleEdit = (id: string) => {
    const registration = registrations.find((r) => r.id === id);
    if (registration) {
      setFormData(registration);
      setIsEditing(true);
    }
  };

  const handleUpdate = () => {
    dispatch(updateRegistration(formData));
    setFormData(generateMockData());
    setIsEditing(false);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteRegistration(id));
  }; 
   interface RegistrationFormData {
    id?: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    degree: string;
    major: string;
    gradYear: Date; 
    dateOfBirth: Date; 
    gender: string;
    ethnicity: string;
  }    

  const nameField = new TextInputField('name', 'Name', formData.name, (value) =>
    setFormData({ ...formData, name: value })
  );
  const emailField = new TextInputField('email', 'Email', formData.email, (value) =>
    setFormData({ ...formData, email: value })
  );
  const phoneField = new TextInputField('phone', 'Phone', formData.phone, (value) =>
    setFormData({ ...formData, phone: value })
  );
  const degreeField = new DropdownField(
    'degree',
    'Degree',
    formData.degree,
    (value) => setFormData({ ...formData, degree: value }),
    [
      { label: 'Bachelor of Science', value: 'Bachelor of Science' },
      { label: 'Bachelor of Arts', value: 'Bachelor of Arts' },
      { label: 'Master of Science', value: 'Master of Science' },
      { label: 'Master of Arts', value: 'Master of Arts' },
    ]
  );
  const majorField = new TextInputField('major', 'Major', formData.major, (value) =>
    setFormData({ ...formData, major: value })
  );
  const gradYearField = (
    <DateField
      name="gradYear"
      label="Graduation Year"
      value={formData.gradYear}
      onChange={(value: Date) => setFormData({ ...formData, gradYear: value })}
    />
  );
  
  const dateOfBirthField = (
    <DateField
      name="dateOfBirth"
      label="Date of Birth"
      value={formData.dateOfBirth}
      onChange={(value: Date) => setFormData({ ...formData, dateOfBirth: value })}
    />
  );
  

  const genderField = new DropdownField(
    'gender',
    'Gender',
    formData.gender,
    (value) => setFormData({ ...formData, gender: value }),
    [
      { label: 'Male', value: 'Male' },
      { label: 'Female', value: 'Female' },
      { label: 'Non-Binary', value: 'Non-Binary' },
    ]
  );
  const ethnicityField = new DropdownField(
    'ethnicity',
    'Ethnicity',
    formData.ethnicity,
    (value) => setFormData({ ...formData, ethnicity: value }),
    [
      { label: 'Asian', value: 'Asian' },
      { label: 'Black or African American', value: 'Black or African American' },
      { label: 'Hispanic or Latino', value: 'Hispanic or Latino' },
      { label: 'White', value: 'White' },
      { label: 'Other', value: 'Other' },
    ]
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
    <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md sm:w-auto">
      <h1 className="text-2xl font-bold text-white mb-6 text-center">College Registration</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center bg-gray-700 rounded-lg px-4 py-2">
              <svg
                className="h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              {nameField.render()}
            </div>
            <div className="flex items-center bg-gray-700 rounded-lg px-4 py-2">
              <svg
                className="h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              {emailField.render()}
            </div>
            <div className="flex items-center bg-gray-700 rounded-lg px-4 py-2">
              <svg
                className="h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {phoneField.render()}
            </div>
            <div className="flex items-center bg-gray-700 rounded-lg px-4 py-2">
              <svg
                className="h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              {degreeField.render()}
            </div>
            <div className="flex items-center bg-gray-700 rounded-lg px-4 py-2">
              <svg
                className="h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              {majorField.render()}
            </div>
            <div className="flex items-center bg-gray-700 rounded-lg px-4 py-2">
              <svg
                className="h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {gradYearField}
            </div>
            <div className="flex items-center bg-gray-700 rounded-lg px-4 py-2">
              <svg
                className="h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {dateOfBirthField}
            </div>
            <div className="flex items-center bg-gray-700 rounded-lg px-4 py-2">
              <svg
                className="h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              {genderField.render()}
            </div>
            <div className="flex items-center bg-gray-700 rounded-lg px-4 py-2">
              <svg
                className="h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              {ethnicityField.render()}
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>
          <div className="mt-8">
          <h2 className="text-xl font-bold text-white mb-4">Registered Students</h2>
          <ul className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {registrations.map((registration) => (
              <li
                key={registration.id}
                className="bg-gray-700 rounded-lg shadow-lg p-4 transition duration-300 hover:scale-105"
              >
                  <h3 className="text-lg font-bold text-white">{registration.name}</h3>
                  <p className="text-gray-400">Email: {registration.email}</p>
                  <p className="text-gray-400">Phone: {registration.phone}</p>
                  <div className="flex justify-end space-x-4 mt-4">
                    <button
                      onClick={() => registration.id && handleEdit(registration.id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg transition duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => registration.id && handleDelete(registration.id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };
export default CollegeRegistrationForm;