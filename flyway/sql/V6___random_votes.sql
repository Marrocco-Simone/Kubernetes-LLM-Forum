INSERT INTO question_votes (question_id, user_uuid, vote)
SELECT
  floor(random() * (SELECT MAX(id) FROM questions)) + 1 AS question_id,
  md5(random()::text)::uuid AS user_uuid,
  random() > 0.3 AS vote
FROM generate_series(1, 1000);

INSERT INTO answer_votes (answer_id, user_uuid, vote)
SELECT
  floor(random() * (SELECT MAX(id) FROM answers)) + 1 AS answer_id,
  md5(random()::text)::uuid AS user_uuid,
  random() > 0.3 AS vote
FROM generate_series(1, 1000);