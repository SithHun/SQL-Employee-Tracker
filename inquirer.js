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
    
    // Function to display all departments
    function viewAllDepartments() {
      console.log('All Departments:');
      console.table(departments);
      returnToMenu();
    }
    
    // Function to display all roles
    function viewAllRoles() {
      console.log('All Roles:');
      console.table(roles);
      returnToMenu();
    }
    
    // Function to display all employees
    function viewAllEmployees() {
      console.log('All Employees:');
      console.table(employees);
      returnToMenu();
    }
    
    // Function to add a department
    function addDepartment() {
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the department:',
          },
        ])
        .then((answers) => {
          const newDepartment = {
            id: departments.length + 1,
            name: answers.name,
          };
          departments.push(newDepartment);
          console.log('New department added successfully!');
          returnToMenu();
        });
    }
    
    // Function to add a role
    function addRole() {
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'title',
            message: 'Enter the title of the role:',
          },
          {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary for the role:',
          },
          {
            type: 'list',
            name: 'department',
            message: 'Select the department for the role:',
            choices: departments.map((department) => department.name),
          },
        ])
        .then((answers) => {
          const departmentId = departments.find((department) => department.name === answers.department).id;
          const newRole = {
            id: roles.length + 1,
            title: answers.title,
            salary: parseFloat(answers.salary),
            department_id: departmentId,
          };
          roles.push(newRole);
          console.log('New role added successfully!');
          returnToMenu();
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
            type: 'list',
            name: 'role',
            message: "Select the employee's role:",
            choices: roles.map((role) => role.title),
          },
          {
            type: 'list',
            name: 'manager',
            message: "Select the employee's manager:",
            choices: employees.map((employee) => `${employee.first_name} ${employee.last_name}`),
          },
        ])
        .then((answers) => {
          const roleId = roles.find((role) => role.title === answers.role).id;
          const managerId = employees.find((employee) => `${employee.first_name} ${employee.last_name}` === answers.manager).id;
          const newEmployee = {
            id: employees.length + 1,
            first_name: answers.first_name,
            last_name: answers.last_name,
            role_id: roleId,
            manager_id: managerId,
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
            name: 'employee',
            message: 'Select an employee to update:',
            choices: employeeChoices,
          },
          {
            type: 'list',
            name: 'role',
            message: 'Select the new role for the employee:',
            choices: roleChoices,
          },
        ])
        .then((answers) => {
          const employeeId = answers.employee;
          const roleId = answers.role;
    
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
          }
        });
    }
    
    // Start the application
    displayMenu();
    


}); // End of connection