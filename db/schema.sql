DROP DATABASE IF EXISTS employeetracker_db;
CREATE DATABASE employeetracker_db;

-- DEPARTMENT TABLE
CREATE TABLE department (
  id INT PRIMARY KEY,
  name VARCHAR(30)
);

-- ROLE TABLE
CREATE TABLE role (
  id INT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department (id)
);