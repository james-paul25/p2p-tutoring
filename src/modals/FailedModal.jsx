import React from "react";
import { XCircle } from "lucide-react";
import { useEscapeClose } from "../utils/useEscapeClose";

const FailedModal = ({ message, onClose }) => {
  useEscapeClose(onClose);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 relative">
        <div className="flex flex-col items-center text-center">
          <XCircle className="w-12 h-12 text-red-500 mb-2" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Failed</h2>
          <p className="text-gray-600">{message}</p>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FailedModal;
