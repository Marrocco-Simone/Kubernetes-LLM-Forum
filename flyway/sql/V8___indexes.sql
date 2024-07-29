CREATE INDEX idx_questions_course_id ON questions(course_id, last_updated);
CREATE INDEX idx_answers_question_id ON answers(question_id, last_updated);
-- CREATE INDEX idx_question_votes_question_id ON question_votes(question_id);
-- CREATE INDEX idx_answer_votes_answer_id ON answer_votes(answer_id);

-- CREATE INDEX idx_questions_user_uuid ON questions(user_uuid, last_updated);
-- CREATE INDEX idx_answers_user_uuid ON answers(user_uuid, last_updated);
CREATE INDEX idx_question_votes_user_uuid ON question_votes(user_uuid);
CREATE INDEX idx_answer_votes_user_uuid ON answer_votes(user_uuid);