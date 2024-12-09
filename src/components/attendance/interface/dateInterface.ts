const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    weekday: 'short',
    day: 'numeric',
};

export const formatDateAttendance = (date: string): string => {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
        return 'Invalid Date';
    }

    return `${d.toLocaleString('default', { weekday: 'short' })}, ${d.getDate()} ${d.toLocaleString('default', { month: 'long' })} ${d.getFullYear()}`;
};
