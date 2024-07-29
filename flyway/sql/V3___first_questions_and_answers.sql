-- Insert questions
INSERT INTO questions (course_id, title, text, user_uuid)
VALUES 
(1, 'What is a variable?', 'Can someone explain what a variable is in programming?', '123e4567-e89b-12d3-a456-426614174000'),
(1, 'Difference between syntax and semantics?', 'How do syntax and semantics differ in programming languages?', '123e4567-e89b-12d3-a456-426614174001'),
(2, 'What is HTML?', 'What role does HTML play in web development?', '123e4567-e89b-12d3-a456-426614174002'),
(2, 'How do CSS and JavaScript improve web design?', 'Can someone explain the roles of CSS and JavaScript in web design?', '123e4567-e89b-12d3-a456-426614174003'),
(3, 'What is a primary key?', 'Why is a primary key important in databases?', '123e4567-e89b-12d3-a456-426614174004'),
(3, 'Understanding Database Indexes', 'How do database indexes improve query performance?', '123e4567-e89b-12d3-a456-426614174000'),
(1, 'What is a function in programming?', 'Can someone explain what a function is and how it is used in programming?', '123e4567-e89b-12d3-a456-426614174017'),
(2, 'What is the purpose of a web server?', 'How does a web server work and what is its purpose in web development?', '123e4567-e89b-12d3-a456-426614174018'),
(3, 'What are transactions in databases?', 'Can someone explain what transactions are and how they are used in databases?', '123e4567-e89b-12d3-a456-426614174019');

-- Insert answers for the first question
INSERT INTO answers (question_id, text, user_uuid)
VALUES 
(1, 'A variable is a storage location paired with an associated symbolic name, which contains some known or unknown quantity of information referred to as a value.', '223e4567-e89b-12d3-a456-426614174005'),
(1, 'Think of a variable as a box where you can store a piece of data or information.', '223e4567-e89b-12d3-a456-426614174006'),
(1, 'Variables in programming are used to store data that can be changed later in the program.', '223e4567-e89b-12d3-a456-426614174007');

-- Insert answers for the second question
INSERT INTO answers (question_id, text, user_uuid)
VALUES 
(2, 'Syntax is the set of rules that defines the combinations of symbols that are considered to be correctly structured programs in that language.', '223e4567-e89b-12d3-a456-426614174008'),
(2, 'Semantics is the meaning of those syntactic sequences, ensuring that the declarations and commands mean something to the compiler or interpreter.', '223e4567-e89b-12d3-a456-426614174009'),
(2, 'Syntax is about structure, while semantics is about meaning.', '223e4567-e89b-12d3-a456-426614174010');

-- Insert answers for the third question
INSERT INTO answers (question_id, text, user_uuid)
VALUES 
(3, 'HTML stands for HyperText Markup Language. It is the standard markup language for documents designed to be displayed in a web browser.', '223e4567-e89b-12d3-a456-426614174011'),
(3, 'HTML is used to create the structure of web pages.', '223e4567-e89b-12d3-a456-426614174012'),
(3, 'It can be assisted by technologies such as Cascading Style Sheets (CSS) and scripting languages such as JavaScript.', '223e4567-e89b-12d3-a456-426614174013');

-- Insert answers for the fourth question
INSERT INTO answers (question_id, text, user_uuid)
VALUES 
(4, 'CSS is used for styling HTML elements on the web, making them look better.', '223e4567-e89b-12d3-a456-426614174014'),
(4, 'JavaScript is used to make web pages interactive and dynamic.', '223e4567-e89b-12d3-a456-426614174015'),
(4, 'Together, CSS and JavaScript allow developers to create sophisticated web experiences.', '223e4567-e89b-12d3-a456-426614174016');

-- Insert answers for the fifth question
INSERT INTO answers (question_id, text, user_uuid)
VALUES 
(5, 'A primary key is a unique identifier for each record in a database table.', '223e4567-e89b-12d3-a456-426614174017'),
(5, 'It ensures that each record can be uniquely identified, which is essential for relationships between tables.', '223e4567-e89b-12d3-a456-426614174018'),
(5, 'Primary keys prevent duplicate records and help maintain the integrity of the database.', '223e4567-e89b-12d3-a456-426614174019');

-- Insert three answers for the sixth question 
INSERT INTO answers (question_id, text, user_uuid)
VALUES 
(6, 'Database indexes help by reducing the number of records the database has to scan to find the relevant data.', '234f5678-f90c-23d4-b567-537725176401'),
(6, 'Indexes are like the index of a book. They help in quickly locating the required information without scanning the entire dataset.', '345g6789-g01d-34e5-c678-648836178202'),
(6, 'While indexes improve read operations, it is important to note they can slow down write operations because the index also needs to be updated.', '456h7890-h12e-45f6-d789-759947179303');

-- Insert three answers for the seventh question
INSERT INTO answers (question_id, text, user_uuid)
VALUES 
(7, 'A function is a block of organized, reusable code that is used to perform a single, related action.', '323e4567-e89b-12d3-a456-426614174020'),
(7, 'Functions provide better modularity for your application and a high degree of code reusing.', '323e4567-e89b-12d3-a456-426614174021'),
(7, 'In programming, functions are defined to perform a specific task and can return a value.', '323e4567-e89b-12d3-a456-426614174022');

-- Insert three answers for the eighth question
INSERT INTO answers (question_id, text, user_uuid)
VALUES 
(8, 'A web server is a software and hardware that uses HTTP and other protocols to respond to client requests made over the World Wide Web.', '323e4567-e89b-12d3-a456-426614174023'),
(8, 'The main purpose of a web server is to store, process, and deliver web pages to users.', '323e4567-e89b-12d3-a456-426614174024'),
(8, 'Web servers work by accepting requests from clients, processing these requests, and then sending the requested page or data to the client.', '323e4567-e89b-12d3-a456-426614174025');

-- Insert three answers for the ninth question
INSERT INTO answers (question_id, text, user_uuid)
VALUES 
(9, 'Transactions in databases are a sequence of one or more SQL operations that are executed as a single unit of work.', '323e4567-e89b-12d3-a456-426614174026'),
(9, 'A transaction ensures data integrity and consistency in database operations.', '323e4567-e89b-12d3-a456-426614174027'),
(9, 'Transactions follow the ACID properties (Atomicity, Consistency, Isolation, Durability) to ensure that all operations within the work unit are completed successfully.', '323e4567-e89b-12d3-a456-426614174028');