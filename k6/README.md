# This folder should contain the k6 tests for the application

There are five tests, all excecutable by the script `execute_all.sh`.

You need to have the application running (eg `docker compose up --build`) and k6 installed on your machine.

After the test it is recommended to clean the modified db (`docker compose down`).

The tests are:

- add question, different user each time
- add answer, different user each time
- add vote, different user each time
- open course_page, now populated with lots of questions (but the api returns only the first 20 due to pagination)
- open question_page, now populated with lots of answers (but the api returns only the first 20 due to pagination)
