import http from "k6/http";
import { uuidv4 } from "https://jslib.k6.io/k6-utils/1.4.0/index.js";

export const options = {
  duration: "10s",
  vus: 5,
  summaryTrendStats: ["avg", "p(99)"],
};

const user_uuid = uuidv4();
const questionId = 1;
export default function () {
  http.get(
    `http://localhost:7800/api/questions/${questionId}?user_uuid=${user_uuid}`
  );
  http.get(
    `http://localhost:7800/api/questions/${questionId}/answers?offset=0&user_uuid=${user_uuid}`
  );
}
