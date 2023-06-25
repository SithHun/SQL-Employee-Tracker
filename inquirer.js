const inquirer = require('inquirer');
const mysql = require('mysql2');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'employeetracker_db',
});

// Connect to the database
connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database: ' + err.stack);
      return;
    }
    console.log('Connected to the database as ID ' + connection.threadId);

    // ---- Inquirer Queries ----


// Arrays for departments, roles, and employees
let departments = [
  { id: 1, name: "Computer Engineering" },
  { id: 2, name: "Information Technology" },
];

let roles = [
  { id: 1, title: "Software Engineer", salary: 150000, department_id: 1 },
  { id: 2, title: "Network Engineer", salary: 120000, department_id: 2 },
];

let employees = [
  { id: 1, first_name: "John", last_name: "Doe", role_id: 1, manager_id: null },
  { id: 2, first_name: "Jane", last_name: "Smith", role_id: 2, manager_id: 1 },
];

// Function to display all departments
function viewAllDepartments() {
  console.log("All Departments:");
  console.table(departments);
}

// Function to display all roles
function viewAllRoles() {
  console.log("All Roles:");
  console.table(roles);
}

// Function to display all employees
function viewAllEmployees() {
  console.log("All Employees:");
  console.table(employees);
}

// Function to add a department
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the name of the department:",
      },
    ])
    .then((answers) => {
      const newDepartment = {
        id: departments.length + 1,
        name: answers.name,
      };
      departments.push(newDepartment);
      console.log("New department added successfully!");
    });
}

// Function to add a role
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Enter the title of the role:",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter the salary for the role:",
      },
      {
        type: "input",
        name: "department_id",
        message: "Enter the department ID for the role:",
      },
    ])
    .then((answers) => {
      const newRole = {
        id: roles.length + 1,
        title: answers.title,
        salary: parseFloat(answers.salary),
        department_id: parseInt(answers.department_id),
      };
      roles.push(newRole);
      console.log("New role added successfully!");
    });
}




}); // End of connection