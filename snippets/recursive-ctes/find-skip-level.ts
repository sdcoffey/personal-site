async function getSkipLevel(employee_id: number): Employee | null {
  const employee = await db.query(`SELECT * FROM employees WHERE id = :employee_id`,
    { employee_id }
  );

  const skipCount = 0;
  let manager: Employee | null = employee;
  do {
    manager = await db.query(`SELECT * FROM employees WHERE id = :manager_id`,
      { manager_id: employee.id }
    );
    skipCount++;
  } while(skipCount < 2 && !== null);

  return manager;
}
