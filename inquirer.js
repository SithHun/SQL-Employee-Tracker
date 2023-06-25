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
    console.log('Connected to the MySQL employeetracker_db successfully');

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

// Function to add an employee
function addEmployee() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'first_name',
          message: "Enter the employee's first name:",
        },
        {
          type: 'input',
          name: 'last_name',
          message: "Enter the employee's last name:",
        },
        {
          type: 'input',
          name: 'role_id',
          message: "Enter the employee's role ID:",
        },
        {
          type: 'input',
          name: 'manager_id',
          message: "Enter the employee's manager ID (leave blank if none):",
        },
      ])
      .then((answers) => {
        const newEmployee = {
          id: employees.length + 1,
          first_name: answers.first_name,
          last_name: answers.last_name,
          role_id: parseInt(answers.role_id),
          manager_id: answers.manager_id ? parseInt(answers.manager_id) : null,
        };
        employees.push(newEmployee);
        console.log('New employee added successfully!');
        returnToMenu();
      });
  }
  
  // Function to update an employee's role
  function updateEmployeeRole() {
    const employeeChoices = employees.map((employee) => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id,
    }));
  
    const roleChoices = roles.map((role) => ({
      name: role.title,
      value: role.id,
    }));
  
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'employee_id',
          message: 'Select an employee to update:',
          choices: employeeChoices,
        },
        {
          type: 'list',
          name: 'role_id',
          message: 'Select the new role for the employee:',
          choices: roleChoices,
        },
      ])
      .then((answers) => {
        const employeeId = answers.employee_id;
        const roleId = answers.role_id;
  
        // Find the employee by ID and update their role
        const employee = employees.find((emp) => emp.id === employeeId);
        if (employee) {
          employee.role_id = roleId;
          console.log('Employee role updated successfully!');
        } else {
          console.log('Employee not found.');
        }
        returnToMenu();
      });
  }
  
  // Function to prompt user to return to the menu
  function returnToMenu() {
    inquirer
      .prompt([
        {
          type: 'confirm',
          name: 'return',
          message: 'Return to the main menu?',
          default: true,
        },
      ])
      .then((answers) => {
        if (answers.return) {
          // If user chooses to return, display the menu again
          displayMenu();
        } else {
          // If user chooses not to return, exit the application
          console.log('Goodbye!');
          process.exit();
        }
      });
  }
  
  // Function to display the main menu
  function displayMenu() {
    console.log('=== Employee Tracker Menu ===');
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'option',
          message: 'Select an option:',
          choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit',
          ],
        },
      ])
      .then((answers) => {
        const option = answers.option;
  
        switch (option) {
          case 'View all departments':
            viewAllDepartments();
            break;
          case 'View all roles':
            viewAllRoles();
            break;
          case 'View all employees':
            viewAllEmployees();
            break;
          case 'Add a department':
            addDepartment();
            break;
          case 'Add a role':
            addRole();
            break;
          case 'Add an employee':
            addEmployee();
            break;
          case 'Update an employee role':
            updateEmployeeRole();
            break;
          case 'Exit':
            console.log('Goodbye!');
            process.exit();
          default:
            console.log('Invalid option selected.');
            displayMenu();
        }
      });
  }
  
  // Start the application
  displayMenu()


}); // End of connection