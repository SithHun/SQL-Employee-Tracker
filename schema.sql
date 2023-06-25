DROP DATABASE IF EXISTS employeetracker_db;
CREATE DATABASE employeetracker_db;

-- DEPARTMENT Table
CREATE TABLE department (
  id INT PRIMARY KEY,
  name VARCHAR(30)
);