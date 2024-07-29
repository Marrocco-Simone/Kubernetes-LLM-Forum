import { Hono } from "./deps.js";
import * as controllers from "./controllers.js";

const app = new Hono();

app.get("/", (c) =>
  c.json({ success: true, message: "Welcome to the QA API" })
);

app.get("/courses", controllers.getAllCourses);
app.get(
  "/courses/:courseId/questions",
  controllers.getAllQuestionsOfCourseWithUserVotes
);
app.get("/questions/:questionId", controllers.getQuestionWithUserVote);
app.get(
  "/questions/:questionId/answers",
  controllers.getAnswersOfQuestionWithUserVotes
);
app.post("/questions", controllers.createQuestion);
app.post("/answers", controllers.createAnswer);
app.post("/questions/:questionId/vote", controllers.voteForQuestion);
app.post("/answers/:answerId/vote", controllers.voteForAnswer);

// * launch application
const portConfig = { port: 7777, hostname: "0.0.0.0" };
Deno.serve(portConfig, app.fetch);
