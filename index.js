const inquirer = require('inquirer');
const { Pool } = require('pg');

const pool = new Pool(
  {
    // Enter PostgreSQL username
    user: 'postgres',
    // Enter PostgreSQL password
    password: 'easterdrew',
    host: 'localhost',
    database: 'company_db'
},
console.log('Connected to the company_db database!')
)

pool.connect();

// view all departments, 
// view all roles, 
// view all employees, 
// add a department, 
// add a role, 
// add an employee,
// update an employee role

const CompanyCMSPrompt = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'initialSelection',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role',
                    'Exit'
                ]
            }
        ]).then((answers) => {
            const choice = answers.initialSelection;

            switch (choice) {
                case 'View all departments':
                    pool.query('SELECT * FROM department;', (err, data) => {
                                console.table(data.rows);
                                CompanyCMSPrompt();
                    });
                break;
                case 'View all roles':
                    // JOIN department ON role.department_id = department.id
                    pool.query('SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id;', (err, data) => {
                        console.table(data.rows);
                        CompanyCMSPrompt();
                    });
                break;
                case 'View all employees':
                    pool.query('SELECT employee.id, employee.first_name, employee.last_name, role.title AS title, department.name AS department, role.salary AS salary, employee.manager_id AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id;', (err, data) => {
                        console.table(data.rows);
                        CompanyCMSPrompt();
                    });
                break;
                case 'Add a department':
                    inquirer.prompt([
                        {
                            type: 'input',
                            message: 'Enter the name of department:',
                            name: 'department'
                        }
                    ]).then((answers) => {
                        console.log(answers.department);
                        pool.query(`INSERT INTO department (name) VALUES ('${answers.department}');`, () => {
                            CompanyCMSPrompt();
                        });
                    });
                break;
                case 'Add a role':
                    inquirer.prompt([
                        {
                            type: 'input',
                            message: 'Enter the title of the role:',
                            name: 'title'
                        },
                        {
                            type: 'number',
                            message: 'Enter the salary of the role:',
                            name: 'salary'
                        },
                        {
                            type: 'number',
                            message: 'Enter the department id of the role:',
                            name: 'dept_id'
                        }
                    ]).then((answers) => {
                        pool.query(`INSERT INTO role (title, salary, department_id) VALUES ('${answers.title}', ${answers.salary}, ${answers.dept_id});`, () => {
                            CompanyCMSPrompt();
                        });
                    });
                break;
                case 'Add an employee':
                    inquirer.prompt([
                        {
                            type: 'input',
                            message: 'Enter first name:',
                            name: 'firstName'
                        },
                        {
                            type: 'input',
                            message: 'Enter last name:',
                            name: 'lastName'
                        },
                        {
                            type: 'number',
                            message: 'Enter the role id:',
                            name: 'roleId'
                        },
                    ]).then((answers) => {
                        pool.query(`INSERT INTO employee (first_name, last_name, role_id) VALUES ('${answers.firstName}', '${answers.lastName}', ${answers.roleId})`, () => {
                            CompanyCMSPrompt();
                        });
                    });
                break;
                // case 'Update an employee role':
                //     const employee = pool.query('SELECT first_name, last_name from employee;');
                //     inquirer.prompt([
                //         {
                //             type: 'list',
                //             message: 'Choose an employee:',
                //             name: 'name'
                //         },
                //     ]).then((answers) => {
                //         pool.query(`INSERT INTO employee (first_name, last_name, role_id) VALUES ('${answers.firstName}', '${answers.lastName}', ${answers.roleId})`, () => {
                //             CompanyCMSPrompt();
                //         });
                //     });
                // break;
                default: 
                    process.exit();
            };
        });
};

CompanyCMSPrompt();