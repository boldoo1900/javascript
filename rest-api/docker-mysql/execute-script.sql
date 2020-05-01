CREATE TABLE IF NOT EXISTS employees (
    first_name varchar(25),
    last_name  varchar(25)
);

INSERT INTO employees (first_name, last_name) 
VALUES ('sdfa', 'sdfasdfasf'), ('123', '123'), ('sdfa123', 'sdfasdfasf123');


DROP TABLE IF EXISTS tasks;
CREATE TABLE IF NOT EXISTS tasks (
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    title   VARCHAR(255),
    description    VARCHAR(255),
    dueDateTime    DATETIME default NULL,
    creationDateTime DATETIME default NULL
);

INSERT INTO tasks (title, description, dueDateTime, creationDateTime) 
VALUES ('title1', 'description1', DATE_ADD(now(), INTERVAL -1 DAY), DATE_ADD(now(), INTERVAL -1 DAY)), 
        ('title2', 'description2', now(), now()), 
        ('title3', 'description3', DATE_ADD(now(), INTERVAL 1 DAY), DATE_ADD(now(), INTERVAL 1 DAY));

