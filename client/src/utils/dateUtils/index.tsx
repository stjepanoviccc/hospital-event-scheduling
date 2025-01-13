export const formatDate = (date: Date): string => {
  return date.toLocaleString('sv-SE', {
    timeZoneName: 'short',
    hour12: true, 
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).replace(' ', 'T').slice(0, 16);
};

export const parseDate = (dateString: string): Date => {
  return new Date(dateString);
};
