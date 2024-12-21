exports.up = (pgm) => {
    const employeeServices = [];
    const employees = [1, 2, 3, 4, 5]; // IDs de los empleados
    const services = [1, 2, 3, 4]; // IDs de los servicios

    employees.forEach((employeeId) => {
        // Asignar entre 1 y 3 servicios a cada empleado
        const numServices = Math.floor(Math.random() * 3) + 1;
        const assignedServices = services.sort(() => 0.5 - Math.random()).slice(0, numServices);

        assignedServices.forEach((serviceId) => {
            employeeServices.push(
                `(${employeeId}, ${serviceId}, current_timestamp)`
            );
        });
    });

    pgm.sql(`
        INSERT INTO employee_services (employee_id, service_id, created_at) VALUES
        ${employeeServices.join(', ')};
    `);
};

exports.down = (pgm) => {
    pgm.sql(`
        DELETE FROM employee_services;
    `);
}
