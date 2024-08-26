DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

\c company_db;

CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL
);

INSERT INTO department (name)
VALUES  ('IT'),
        ('Marketing'),
        ('E-Commerce'),
        ('Quality Control'),
        ('Sales'),
        ('Security');

INSERT INTO role (title, salary, department_id)
VALUES  ('Software Developer II', 200000, 1),
        ('Software Developer I', 120000, 1),
        ('Design Lead', 100000, 2),
        ('Graphic Designer', 60000, 2),
        ('Photographer', 45000, 2),
        ('Web Designer', 75000, 3),
        ('Test Engineer II', 80000, 4),
        ('Test Engineer I', 50000, 4),
        ('Sales Lead', 90000, 5),
        ('Sales Rep II', 60000, 5),
        ('Sales Rep I', 45000, 5),
        ('Security Guard', 35000, 6);

INSERT INTO employee (first_name, last_name, role_id)
VALUES  ('Ava', 'Rodriguez', 1),
        ('Noah', 'Hernandez', 2),
        ('Isabella', 'Jones', 3),
        ('Emma', 'Williams', 4),
        ('Charlotte', 'Brown', 5),
        ('Noah', 'Smith', 6),
        ('Mark', 'Ruben', 7),
        ('Sophia', 'Davis', 8),
        ('Charlie', 'Lopez', 9),
        ('Howard', 'White', 10),
        ('Matthew', 'Lennis', 11),
        ('Elijah', 'Miller', 12);