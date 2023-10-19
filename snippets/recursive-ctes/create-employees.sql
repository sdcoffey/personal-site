CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  manager_id INT REFERENCES employees(id)
);
