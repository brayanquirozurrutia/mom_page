exports.up = (pgm) => {
    const appointments = [];
    const employees = [1, 2, 3, 4, 5];
    const services = [1, 2, 3, 4];

    const getRandomDate = () => {
        const start = new Date('2024-01-01');
        const end = new Date('2024-12-31');
        const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return date.toISOString().split('T')[0];
    };

    employees.forEach((employeeId) => {
        const numAppointments = Math.floor(Math.random() * 4) + 2;

        for (let i = 0; i < numAppointments; i++) {
            const serviceId = services[Math.floor(Math.random() * services.length)];
            appointments.push(
                `(${employeeId}, ${serviceId}, 'Cliente ${Math.random().toString(36).substring(7)}', '555-${Math.floor(1000 + Math.random() * 9000)}', '${getRandomDate()}', '12:00:00')`
            );
        }
    });

    pgm.sql(`
        INSERT INTO appointments (employee_id, service_id, client_name, client_phone, appointment_date, appointment_time) VALUES
        ${appointments.join(', ')};
    `);
};

exports.down = (pgm) => {
    pgm.sql(`
        DELETE FROM appointments;
    `);
}
