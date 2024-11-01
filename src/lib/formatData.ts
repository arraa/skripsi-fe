export const formatDate = (date: string | Date): string => {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
        return 'Invalid Date';
    }
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

export const formatStudentData = (data: any) => {
    if (Array.isArray(data)) {
        return data.map((student) => ({
            ...student,
            date_of_birth: formatDate(student.date_of_birth),
            accepted_date: formatDate(student.accepted_date),
        }));
    }

    return {
        ...data,
        date_of_birth: formatDate(data.date_of_birth),
        accepted_date: formatDate(data.accepted_date),
    };
};
