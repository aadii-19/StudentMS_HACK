import { format, isBefore, startOfDay, parseISO, isToday } from 'date-fns';

export const formatDate = (dateString, formatStr = 'MMM d, yyyy') => {
    if (!dateString) return '';
    try {
        return format(parseISO(dateString), formatStr);
    } catch (error) {
        return dateString;
    }
};

export const isOverdue = (dateString, status) => {
    if (!dateString || status !== 'PENDING') return false;
    const today = startOfDay(new Date());
    const dueDate = startOfDay(parseISO(dateString));
    return isBefore(dueDate, today);
};

export const isDueToday = (dateString) => {
    if (!dateString) return false;
    return isToday(parseISO(dateString));
};
