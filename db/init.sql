CREATE DATABASE IF NOT EXISTS library_db;
USE library_db;

CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    available_copies INT DEFAULT 1
);

INSERT INTO books (title, author, available_copies) VALUES 
('Operating Systems Concepts', 'Silberschatz', 5),
('Clean Code', 'Robert C. Martin', 3),
('Docker Deep Dive', 'Nigel Poulton', 4);
