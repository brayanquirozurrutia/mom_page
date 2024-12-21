type EmployeeWorkDay = {
    start_time: string;
    end_time: string;
    dates: string[];
    blocks: string[];
};

type Employee = {
    employee_id: number;
    employee_name: string;
    employee_email: string;
    employee_phone: string;
    work_days: EmployeeWorkDay[];
};

/**
 * Transform the data from the API to a usable format for the frontend.
 * @param data - The data to transform.
 * @returns A record with the available dates and their corresponding time blocks.
 */
export const transformToAvailableDatesWithTimes = (data: Employee[]): Record<string, string[]> => {
    const result: Record<string, string[]> = {};

    data.forEach((employee) => {
        employee.work_days.forEach((day) => {
            day.dates.forEach((date) => {
                if (!result[date]) {
                    result[date] = [];
                }
                // Add the time blocks without duplicates
                result[date] = Array.from(new Set([...result[date], ...day.blocks]));
            });
        });
    });

    return result;
};
