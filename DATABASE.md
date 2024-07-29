TODO: The DATABASE.md outlines the database schema and justifies the used indexes and database denormalization decisions.

# Flyway migration

The project uses multiple database migrations to add all necessary schema. The files are in `/flyway/sql`

# Schemas

The main schema is in `V1___initial_schema.sql`. It does not yet include the denormalitation which is done later (since a database does not start already denormalized usually)

```
CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  course_id INTEGER REFERENCES courses(id),
  title TEXT NOT NULL,
  text TEXT NOT NULL,
  user_uuid TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE answers (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES questions(id),
  text TEXT NOT NULL,
  user_uuid TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE question_votes (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES questions(id),
  user_uuid TEXT NOT NULL,
  vote BOOLEAN NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE answer_votes (
  id SERIAL PRIMARY KEY,
  answer_id INTEGER REFERENCES answers(id),
  user_uuid TEXT NOT NULL,
  vote BOOLEAN NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

# Denormalitation

Since fetching votes for each question/answer gets expensive fast, we duplicate the data and save in the schema a counter of positive and negative votes. The apis to vote manage all the cases also in these counters (new vote, changed vote, deleted vote). We also add the normalitation of the number of questions in a course and answers in a question, to avoid unnecessary fetches when a user is just looking at the parent but wants to know how many elements he can see.

The counters are not added immediately but created by a flyway migration, contained in `V7___counters.sql`. Here we show just the counters schemas.

```
ALTER TABLE courses ADD COLUMN question_count INTEGER DEFAULT 0;
ALTER TABLE questions ADD COLUMN answer_count INTEGER DEFAULT 0;
ALTER TABLE questions ADD COLUMN positive_votes_count INTEGER DEFAULT 0;
ALTER TABLE questions ADD COLUMN negative_votes_count INTEGER DEFAULT 0;
ALTER TABLE answers ADD COLUMN positive_votes_count INTEGER DEFAULT 0;
ALTER TABLE answers ADD COLUMN negative_votes_count INTEGER DEFAULT 0;
```

# Indexes

For the indexes, it was used k6 to determine the best ones. In the k6 folder there is both the test done with and without indexes, to show the improvements.

For questions and answers we index first on course_id and question_id, since those search are the most requested. Then we index by last_updated, since we order them from the most recent.

For votes, since we normalized answers and questions we don't need to fetch them with every data requested, but we need to know what an user voted. So that's why we index on user_uuid.

```
CREATE INDEX idx_questions_course_id ON questions(course_id, last_updated);
CREATE INDEX idx_answers_question_id ON answers(question_id, last_updated);

CREATE INDEX idx_question_votes_user_uuid ON question_votes(user_uuid);
CREATE INDEX idx_answer_votes_user_uuid ON answer_votes(user_uuid);
```

# Test data

Multiple data for courses, questions, answers and votes are created by multiple flyway files. Two files also create a course with a lot of questions, and a question with a lot of answers, in order to test the infinite scrolling functionality.

The data was generated with the help of a Large Language Model.

# Caching

TODO for merits: Caching decisions are outlined in DATABASE.md.

Caching was not required for the assignment, but a Redis configuration like the one done in the Project 1 could be doable in the future by caching apis to get generic data on courses, questions, and answers, invalidated with a new Post request to create a new question/answer. Votes would not be included in caching due to the user specificity.
