const formatDateTime = (dateStr, timeStr) => {
    if (!dateStr || !timeStr) return "";
  
    const dateTimeString = `${dateStr}T${timeStr}`;
    const date = new Date(dateTimeString);
  
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  
    return `${formattedDate} - ${formattedTime}`;
}

const formatDate = (dateStr) => {
    if (!dateStr) return "";
    
    const dateTimeString = `${dateStr}`;
    const date = new Date(dateTimeString);
  
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return `${formattedDate}`;
}

const formatTime = (timeStr) => {
    if (!timeStr) return "";

    const today = new Date().toISOString().split("T")[0];
    const dateTimeString = `${today}T${timeStr}`;
    const date = new Date(dateTimeString);
  
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return `${formattedTime}`;
}

export { formatDateTime, formatDate, formatTime };