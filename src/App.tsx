import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import CollegeRegistrationForm from './components/CollegeRegistrationForm';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="container mx-auto my-8">
        <CollegeRegistrationForm />
      </div>
    </Provider>
  );
};

export default App;