import React from 'react';

interface DropdownProps {
  options: string[];
  onSelect: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    onSelect(selectedOption);
  };

  return (
    <select onChange={handleSelect}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
