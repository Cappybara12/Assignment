import { faker } from '@faker-js/faker';
import { RegistrationFormData } from '../types/registration';

export const generateMockData = (): RegistrationFormData => {
  const futureYear = faker.date.future(4).getFullYear();
  const gradYear = new Date(futureYear, 0, 1); // January 1st of the future year

  // Adjustments based on the correct usage of faker for random values
  const gender = faker.helpers.arrayElement(['Male', 'Female', 'Non-Binary']);
  const ethnicity = faker.helpers.arrayElement([
    'Asian',
    'Black or African American',
    'Hispanic or Latino',
    'White',
    'Other',
  ]);
  const dateOfBirth = faker.date.past(30); // Random psdast date for DOBv

  return {
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.stateAbbr(),
    zip: faker.address.zipCode(),
    degree: faker.system.commonFileExt(),
    major: faker.name.jobTitle(),
    gradYear,
    dateOfBirth,
    gender,
    ethnicity,
  };
};
