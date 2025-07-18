import React from "react";
import { CheckCircle } from "lucide-react";
import { useEscapeClose } from "../utils/useEscapeClose";

const SuccessModal = ({ message, onClose }) => {
  useEscapeClose(onClose);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
    >
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 relative">
        <div className="flex flex-col items-center text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mb-2" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Success</h2>
          <p className="text-gray-600">{message}</p>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
