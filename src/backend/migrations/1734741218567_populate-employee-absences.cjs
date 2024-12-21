exports.up = (pgm) => {
    const absences = [];
    const employees = [1, 2, 3, 4, 5];
    const reasons = ['Vacaciones', 'Enfermedad', 'Emergencia', 'Personal', 'Otro'];

    const getRandomDate = () => {
        const start = new Date('2024-01-01');
        const end = new Date('2024-12-31');
        const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return date.toISOString().split('T')[0];
    };

    employees.forEach((employeeId) => {
        const numAbsences = Math.floor(Math.random() * 3) + 3;
        for (let i = 0; i < numAbsences; i++) {
            absences.push(
                `(${employeeId}, '${getRandomDate()}', '${reasons[Math.floor(Math.random() * reasons.length)]}')`
            );
        }
    });

    pgm.sql(`
        INSERT INTO employee_absences (employee_id, absence_date, reason) VALUES
        ${absences.join(', ')};
    `);
};

exports.down = (pgm) => {
    pgm.sql('DELETE FROM employee_absences');
}