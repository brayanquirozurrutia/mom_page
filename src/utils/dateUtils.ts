
/**
 * Formated a date to a string in ISO format (YYYY-MM-DD).
 * @param date - The date to format.
 * @returns A string with the date in ISO format.
 */
export const formatDate = (date: Date): string =>
    date.toISOString().split("T")[0];


/**
 * Parse a date string in ISO format (YYYY-MM-DD) to a Date object.
 * @param dateString - The date string to parse.
 * @returns A Date object with the parsed date.
 */
export const parseDate = (dateString: string): Date => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
};

