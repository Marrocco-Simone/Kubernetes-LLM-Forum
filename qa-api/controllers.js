import * as textGeneratorService from "./textGeneratorService.js";
import * as databaseService from "./databaseService.js";

// * get controllers

export const getAllCourses = async (c) => {
  const courses = await databaseService.getCourses();
  return c.json({ success: true, courses });
};

export const getAllQuestionsOfCourseWithUserVotes = async (c) => {
  const { courseId } = c.req.param();
  const { user_uuid, offset } = c.req.query();

  const questions = await databaseService.getQuestionsOfCourse(
    courseId,
    offset
  );
  const questionsVotes = user_uuid
    ? await databaseService.getQuestionsVotes(user_uuid, courseId)
    : [];

  return c.json({ success: true, questions, questionsVotes });
};

export const getQuestionWithUserVote = async (c) => {
  const { questionId } = c.req.param();
  const question = await databaseService.getQuestion(questionId);
  if (!question) {
    c.status(404);
    return c.json({ success: false, error: "Question not found" });
  }

  const { user_uuid } = c.req.query();
  const questionVote = user_uuid
    ? await databaseService.getQuestionVote(user_uuid, questionId)
    : undefined;

  return c.json({ success: true, question, questionVote });
};

export const getAnswersOfQuestionWithUserVotes = async (c) => {
  const { questionId } = c.req.param();
  const { user_uuid, offset } = c.req.query();

  const question = await databaseService.getQuestion(questionId);
  if (!question) {
    c.status(404);
    return c.json({ success: false, error: "Question not found" });
  }

  const answers = await databaseService.getAnswersOfQuestion(
    questionId,
    offset
  );

  const answersVotes = user_uuid
    ? await databaseService.getAnswersVotes(user_uuid, questionId)
    : [];

  return c.json({ success: true, answers, answersVotes });
};

// * creation controllers

const checkRecentCreations = async (user_uuid) => {
  const userQuestions = await databaseService.getQuestionsOfUser(user_uuid);
  const userAnswers = await databaseService.getAnswersOfUser(user_uuid);

  const ONE_MINUTE = 60 * 1000;
  const now = Date.now();

  const recentQuestions = userQuestions.filter(
    (q) => now - q.created_at < ONE_MINUTE
  );
  const recentAnswers = userAnswers.filter(
    (a) => now - a.created_at < ONE_MINUTE
  );

  const recents = [...recentQuestions, ...recentAnswers].sort(
    (a, b) => b.created_at - a.created_at
  );
  const has_created_recently = recents.length > 0;
  const last_difference = has_created_recently
    ? 60 - Math.floor((now - recents[0].created_at) / 1000)
    : 0;
  return { has_created_recently, last_difference };
};

export const createQuestion = async (c) => {
  const { user_uuid, courseId, title, text } = await c.req.json();
  const { has_created_recently, last_difference } = await checkRecentCreations(
    user_uuid
  );
  if (has_created_recently) {
    c.status(400);
    return c.json({
      success: false,
      error: `You have created a question or an answer recently. Please wait a moment (${last_difference} s)`,
    });
  }

  const course = await databaseService.getCourse(courseId);
  if (!course) {
    c.status(404);
    return c.json({ success: false, error: "Course not found" });
  }

  const question = await databaseService.createQuestion(
    user_uuid,
    courseId,
    title,
    text
  );

  const { no_answers } = c.req.query();
  if (!no_answers) {
    textGeneratorService.addAnswersAndVotesToNewQuestion(question);
  }
  return c.json({ success: true, question });
};

export const createAnswer = async (c) => {
  const { user_uuid, questionId, text } = await c.req.json();
  const { has_created_recently, last_difference } = await checkRecentCreations(
    user_uuid
  );
  if (has_created_recently) {
    c.status(400);
    return c.json({
      success: false,
      error: `You have created a question or an answer recently. Please wait (${last_difference} s)`,
    });
  }

  const question = await databaseService.getQuestion(questionId);
  if (!question) {
    c.status(404);
    return c.json({ success: false, error: "Question not found" });
  }

  const answer = await databaseService.createAnswer(
    user_uuid,
    questionId,
    text
  );
  textGeneratorService.giveRandomVotesToAnswer(answer.id);
  await databaseService.updateQuestionLastUpdated(questionId);
  return c.json({ success: true, answer });
};

// * vote controllers

export const voteForQuestion = async (c) => {
  const { user_uuid, vote } = await c.req.json();
  const { questionId } = c.req.param();

  const question = await databaseService.getQuestion(questionId);
  if (!question) {
    c.status(404);
    return c.json({ success: false, error: "Question not found" });
  }

  const prevVote = await databaseService.getQuestionVote(user_uuid, questionId);
  if (prevVote) {
    if (prevVote.vote === vote) {
      await databaseService.deleteQuestionVote(user_uuid, questionId, vote);
    } else {
      await databaseService.switchQuestionVote(user_uuid, questionId, vote);
    }
  } else {
    await databaseService.createQuestionVote(user_uuid, questionId, vote);
  }
  await databaseService.updateQuestionLastUpdated(questionId);

  return c.json({ success: true });
};

export const voteForAnswer = async (c) => {
  const { user_uuid, vote } = await c.req.json();
  const { answerId } = c.req.param();

  const answer = await databaseService.getAnswer(answerId);
  if (!answer) {
    c.status(404);
    return c.json({ success: false, error: "Answer not found" });
  }

  const prevVote = await databaseService.getAnswerVote(user_uuid, answerId);
  if (prevVote) {
    if (prevVote.vote === vote) {
      await databaseService.deleteAnswerVote(user_uuid, answerId, vote);
    } else {
      await databaseService.switchAnswerVote(user_uuid, answerId, vote);
    }
  } else {
    await databaseService.createAnswerVote(user_uuid, answerId, vote);
  }
  await databaseService.updateAnswerLastUpdated(answerId);

  return c.json({ success: true });
};
