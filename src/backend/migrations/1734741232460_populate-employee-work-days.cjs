exports.up = (pgm) => {
    const workDays = [];
    const employees = [1, 2, 3, 4, 5];
    const daysOfWeek = [1, 2, 3, 4, 5, 6];

    const generateRandomSchedule = () => {
        const startHour = Math.floor(Math.random() * (21 - 9)) + 9;
        const startMinute = Math.random() < 0.5 ? '00' : '30';
        const endHour = Math.min(startHour + Math.floor(Math.random() * 4) + 4, 21);
        const endMinute = Math.random() < 0.5 ? '00' : '30';
        return { start_time: `${startHour}:${startMinute}`, end_time: `${endHour}:${endMinute}` };
    };

    employees.forEach((employeeId) => {
        const numDays = Math.floor(Math.random() * 4) + 3;
        const employeeDays = daysOfWeek.sort(() => 0.5 - Math.random()).slice(0, numDays);

        employeeDays.forEach((day_of_week) => {
            const { start_time, end_time } = generateRandomSchedule();
            workDays.push(
                `(${employeeId}, ${day_of_week}, '${start_time}', '${end_time}')`
            );
        });
    });

    pgm.sql(`
        INSERT INTO employee_work_days (employee_id, day_of_week, start_time, end_time) VALUES
        ${workDays.join(', ')};
    `);
};

exports.down = (pgm) => {
    pgm.sql(`
        DELETE FROM employee_work_days;
    `);
}