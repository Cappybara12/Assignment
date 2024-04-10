import React from 'react';

interface DateFieldProps {
  name: string;
  label: string;
  value: Date;
  onChange: (value: Date) => void;
}

const DateField: React.FC<DateFieldProps> = ({ name, label, value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    onChange(selectedDate);
  };

  return (
    <div>
      <label htmlFor={name} className="block font-bold mb-2">
        {label}
      </label>
      <input
        type="date"
        id={name}
        name={name}
        value={value.toISOString().slice(0, 10)}
        onChange={handleChange}
        className="border rounded-lg px-4 py-2 w-full"
      />
    </div>
  );
};

export default DateField;
