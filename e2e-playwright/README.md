# Running end to end tests

Run the E2E tests with the following command.

```
docker compose run --entrypoint=npx e2e-playwright playwright test && docker compose rm -sf
```

There are five tests, each one depending on the previous one:

- Open course page, and see course and questions
- Add question, and verify it is created with 3 random answers
- Open question page, and see question and answers
- Add answer, and verify it is created
- Add two answers in succession, and verify the second is not created (because we need to wait)
