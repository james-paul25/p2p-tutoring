const statusTextColors = {
    PENDING: "text-yellow-600",
    REJECTED: "text-red-600",
    APPROVED: "text-green-600",
    COMPLETED: "text-blue-600",
    DEFAULT: "text-purple-800",
};
  
const statusColors = {
    PENDING: "bg-yellow-100 hover:bg-yellow-200",
    REJECTED: "bg-red-100 hover:bg-red-200",
    APPROVED: "bg-green-100 hover:bg-green-200",
    COMPLETED: "bg-blue-100 hover:bg-blue-200",
    DEFAULT: "bg-purple-100 hover:bg-purple-200",
};

export { statusTextColors, statusColors };