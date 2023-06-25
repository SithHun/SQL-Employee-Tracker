const inquirer = require('inquirer');

// Arrays for departments, roles, and employees
let departments = [
  { id: 1, name: 'Computer Engineering' },
  { id: 2, name: 'Information Technology' },
];

let roles = [
  { id: 1, title: 'Software Engineer', salary: 150000, department_id: 1 },
  { id: 2, title: 'Network Engineer', salary: 120000, department_id: 2 },
];

let employees = [
  { id: 1, first_name: 'John', last_name: 'Doe', role_id: 1, manager_id: null },
  { id: 2, first_name: 'Jane', last_name: 'Smith', role_id: 2, manager_id: 1 },
];