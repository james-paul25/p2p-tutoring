import React from "react";

const InputField = ({ label, ...props }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        {...props}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
      />
    </div>
)

export default InputField;