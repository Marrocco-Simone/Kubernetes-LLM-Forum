import * as databaseService from "./databaseService.js";

const N_NEW_ANSWERS = 3;
const MAX_VOTES = 10;

export async function addAnswersAndVotesToNewQuestion(question) {
  giveRandomVotesToQuestion(question.id);

  for (let i = 0; i < N_NEW_ANSWERS; i++) {
    createNewAnswer(question);
  }
}

async function giveRandomVotesToQuestion(questionId) {
  const random_votes = Math.floor(Math.random() * MAX_VOTES);
  for (let i = 0; i < random_votes; i++) {
    databaseService.createQuestionVote(
      randomString(10),
      questionId,
      Math.random() > 0.3
    );
  }
}

async function createNewAnswer(question) {
  const answerText = await generateText(question);
  const answer = await databaseService.createAnswer(
    randomString(10),
    question.id,
    answerText
  );
  giveRandomVotesToAnswer(answer.id);
}

export async function giveRandomVotesToAnswer(answerId) {
  const random_votes = Math.floor(Math.random() * MAX_VOTES);
  for (let i = 0; i < random_votes; i++) {
    databaseService.createAnswerVote(
      randomString(10),
      answerId,
      Math.random() > 0.3
    );
  }
}

async function generateText(question) {
  const { title, text } = question;
  const body = JSON.stringify({ question: `${title}\n${text}` });

  console.log("Asked random answer");
  const response = await fetch("http://llm-api:7000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const answer = await response.json();
  console.log("Answered random answer: " + answer);
  return answer;
}

function randomString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
