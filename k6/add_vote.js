import http from "k6/http";
import { uuidv4 } from "https://jslib.k6.io/k6-utils/1.4.0/index.js";

export const options = {
  duration: "10s",
  vus: 5,
  summaryTrendStats: ["avg", "p(99)"],
};

export default function () {
  const user_uuid = uuidv4();
  const questionId = 1;
  const vote = true;

  const body = { user_uuid, vote };

  http.post(
    `http://localhost:7800/api/questions/${questionId}/vote`,
    JSON.stringify(body)
  );
}
