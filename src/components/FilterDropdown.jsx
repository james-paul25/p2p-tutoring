import React from "react";

const FilterDropdown = ({ value, onChange, options = [] }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default FilterDropdown;
