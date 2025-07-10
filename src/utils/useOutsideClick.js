import { useEffect } from "react";

const useOutsideClick = (refId, onClose) => {
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.id === refId) {
        onClose();
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);
    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [refId, onClose]);
};

export { useOutsideClick };
