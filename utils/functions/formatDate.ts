export const formatDateOnly = (date: Date): string => {
  return date.toISOString().split("T")[0];
};


