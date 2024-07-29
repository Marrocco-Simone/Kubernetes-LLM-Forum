import { sql } from "./database.js";

// * get courses

export async function getCourses() {
  const result = await sql`SELECT * FROM courses ORDER BY id`;
  return result;
}

export async function getCourse(courseId) {
  const result = await sql`SELECT * FROM courses WHERE id = ${courseId}`;
  return result[0];
}

// * get questions

export async function getQuestionsOfCourse(courseId, offset) {
  const result = await sql`
    SELECT * 
    FROM questions 
    WHERE course_id = ${courseId} 
    ORDER BY last_updated DESC 
    LIMIT 20 
    OFFSET ${offset}
  `;
  return result;
}

export async function getQuestion(questionId) {
  const result = await sql`SELECT * FROM questions WHERE id = ${questionId}`;
  return result[0];
}

export async function getQuestionsOfUser(user_uuid) {
  const result =
    await sql`SELECT * FROM questions WHERE user_uuid = ${user_uuid} ORDER BY last_updated DESC`;
  return result;
}

// * get answers

export async function getAnswersOfQuestion(questionId, offset) {
  const result = await sql`
    SELECT * 
    FROM answers 
    WHERE question_id = ${questionId} 
    ORDER BY last_updated DESC 
    LIMIT 20 
    OFFSET ${offset}
  `;
  return result;
}

export async function getAnswer(answerId) {
  const result = await sql`SELECT * FROM answers WHERE id = ${answerId}`;
  return result[0];
}

export async function getAnswersOfUser(user_uuid) {
  const result =
    await sql`SELECT * FROM answers WHERE user_uuid = ${user_uuid} ORDER BY last_updated DESC`;
  return result;
}

// * get votes

export async function getQuestionsVotes(user_uuid, courseId) {
  const result = await sql`
    SELECT question_votes.*
    FROM question_votes
    JOIN questions ON question_votes.question_id = questions.id
    WHERE questions.course_id = ${courseId} AND question_votes.user_uuid = ${user_uuid}
  `;
  return result;
}

export async function getQuestionVote(user_uuid, question_id) {
  const result = await sql`
    SELECT * FROM question_votes
    WHERE user_uuid = ${user_uuid} AND question_id = ${question_id}
  `;
  return result[0];
}

export async function getAnswersVotes(user_uuid, question_id) {
  const result = await sql`
    SELECT answer_votes.*
    FROM answer_votes
    JOIN answers ON answer_votes.answer_id = answers.id
    WHERE answers.question_id = ${question_id} AND answer_votes.user_uuid = ${user_uuid}
  `;
  return result;
}

export async function getAnswerVote(user_uuid, answer_id) {
  const result = await sql`
    SELECT * FROM answer_votes
    WHERE user_uuid = ${user_uuid} AND answer_id = ${answer_id}
  `;
  return result[0];
}

// * create questions and answers

export async function createQuestion(user_uuid, courseId, title, text) {
  const result = await sql`
    INSERT INTO questions (course_id, title, text, user_uuid)
    VALUES (${courseId}, ${title}, ${text}, ${user_uuid})
    RETURNING *
  `;

  await sql`UPDATE courses
    SET question_count = question_count + 1
    WHERE id = ${courseId}`;

  return result[0];
}

export async function createAnswer(user_uuid, questionId, text) {
  const result = await sql`
    INSERT INTO answers (question_id, text, user_uuid)
    VALUES (${questionId}, ${text}, ${user_uuid})
    RETURNING *
  `;

  await sql`UPDATE questions
    SET answer_count = answer_count + 1
    WHERE id = ${questionId}`;

  return result[0];
}

// * create votes

export async function createQuestionVote(user_uuid, question_id, vote) {
  const result = await sql`
    INSERT INTO question_votes (user_uuid, question_id, vote)
    VALUES (${user_uuid}, ${question_id}, ${vote})
    RETURNING *
  `;

  if (vote) {
    await sql`
      UPDATE questions
      SET positive_votes_count = positive_votes_count + 1
      WHERE id = ${question_id}
    `;
  } else {
    await sql`
      UPDATE questions
      SET negative_votes_count = negative_votes_count + 1
      WHERE id = ${question_id}
    `;
  }

  return result[0];
}

export async function createAnswerVote(user_uuid, answer_id, vote) {
  const result = await sql`
    INSERT INTO answer_votes (user_uuid, answer_id, vote)
    VALUES (${user_uuid}, ${answer_id}, ${vote})
    RETURNING *
  `;

  if (vote) {
    await sql`
      UPDATE answers
      SET positive_votes_count = positive_votes_count + 1
      WHERE id = ${answer_id}
    `;
  } else {
    await sql`
      UPDATE answers
      SET negative_votes_count = negative_votes_count + 1
      WHERE id = ${answer_id}
    `;
  }

  return result[0];
}

// * update votes

export async function switchQuestionVote(user_uuid, question_id, vote) {
  const result = await sql`
    UPDATE question_votes
    SET vote = ${vote}
    WHERE user_uuid = ${user_uuid} AND question_id = ${question_id}
    RETURNING *
  `;

  if (vote) {
    await sql`
      UPDATE questions
      SET positive_votes_count = positive_votes_count + 1,
          negative_votes_count = negative_votes_count - 1
      WHERE id = ${question_id}
    `;
  } else {
    await sql`
      UPDATE questions
      SET positive_votes_count = positive_votes_count - 1,
          negative_votes_count = negative_votes_count + 1
      WHERE id = ${question_id}
    `;
  }

  return result[0];
}

export async function deleteQuestionVote(user_uuid, question_id, vote) {
  await sql`
    DELETE FROM question_votes 
    WHERE user_uuid = ${user_uuid} AND question_id = ${question_id}
  `;

  if (vote) {
    await sql`
      UPDATE questions
      SET positive_votes_count = positive_votes_count - 1
      WHERE id = ${question_id}
    `;
  } else {
    await sql`
      UPDATE questions
      SET negative_votes_count = negative_votes_count - 1
      WHERE id = ${question_id}
    `;
  }
}

export async function switchAnswerVote(user_uuid, answer_id, vote) {
  const result = await sql`
    UPDATE answer_votes
    SET vote = ${vote}
    WHERE user_uuid = ${user_uuid} AND answer_id = ${answer_id}
    RETURNING *
  `;

  if (vote) {
    await sql`
      UPDATE answers
      SET positive_votes_count = positive_votes_count + 1,
          negative_votes_count = negative_votes_count - 1
      WHERE id = ${answer_id}
    `;
  } else {
    await sql`
      UPDATE answers
      SET positive_votes_count = positive_votes_count - 1,
          negative_votes_count = negative_votes_count + 1
      WHERE id = ${answer_id}
    `;
  }

  return result[0];
}

export async function deleteAnswerVote(user_uuid, answer_id, vote) {
  await sql`
    DELETE FROM answer_votes 
    WHERE user_uuid = ${user_uuid} AND answer_id = ${answer_id}
  `;

  if (vote) {
    await sql`
        UPDATE answers
        SET positive_votes_count = positive_votes_count - 1
        WHERE id = ${answer_id}
      `;
  } else {
    await sql`
        UPDATE answers
        SET negative_votes_count = negative_votes_count - 1
        WHERE id = ${answer_id}
      `;
  }
}

// * update last updated

export async function updateQuestionLastUpdated(question_id) {
  const result = await sql`
    UPDATE questions
    SET last_updated = NOW()
    WHERE id = ${question_id}
    RETURNING *
  `;
  return result[0];
}

export async function updateAnswerLastUpdated(answer_id) {
  const result = await sql`
    UPDATE answers
    SET last_updated = NOW()
    WHERE id = ${answer_id}
    RETURNING *
  `;
  return result[0];
}
