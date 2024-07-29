ALTER TABLE courses ADD COLUMN question_count INTEGER DEFAULT 0;
UPDATE courses SET question_count = sq.count
FROM (
  SELECT course_id, COUNT(*) AS count
  FROM questions
  GROUP BY course_id
) AS sq
WHERE courses.id = sq.course_id;

ALTER TABLE questions ADD COLUMN answer_count INTEGER DEFAULT 0;
UPDATE questions SET answer_count = sa.count
FROM (
  SELECT question_id, COUNT(*) AS count
  FROM answers
  GROUP BY question_id
) AS sa
WHERE questions.id = sa.question_id;

ALTER TABLE questions ADD COLUMN positive_votes_count INTEGER DEFAULT 0;
UPDATE questions
SET positive_votes_count = sq.positive
FROM (
  SELECT question_id, COUNT(*) AS positive
  FROM question_votes
  WHERE vote = TRUE
  GROUP BY question_id
) AS sq
WHERE questions.id = sq.question_id;

ALTER TABLE questions ADD COLUMN negative_votes_count INTEGER DEFAULT 0;
UPDATE questions
SET negative_votes_count = sq.negative
FROM (
  SELECT question_id, COUNT(*) AS negative
  FROM question_votes
  WHERE vote = FALSE
  GROUP BY question_id
) AS sq
WHERE questions.id = sq.question_id;

ALTER TABLE answers ADD COLUMN positive_votes_count INTEGER DEFAULT 0;
UPDATE answers
SET positive_votes_count = sa.positive
FROM (
  SELECT answer_id, COUNT(*) AS positive
  FROM answer_votes
  WHERE vote = TRUE
  GROUP BY answer_id
) AS sa
WHERE answers.id = sa.answer_id;

ALTER TABLE answers ADD COLUMN negative_votes_count INTEGER DEFAULT 0;
UPDATE answers
SET negative_votes_count = sa.negative
FROM (
  SELECT answer_id, COUNT(*) AS negative
  FROM answer_votes
  WHERE vote = FALSE
  GROUP BY answer_id
) AS sa
WHERE answers.id = sa.answer_id;