const { test, expect } = require("@playwright/test");

async function printPage(page) {
  const html = await page.content();
  console.log(html);
}

async function init(page) {
  await page.goto("/");

  // * wait for page to load
  await page.locator("span").filter({ hasText: "Hello" }).waitFor();
  await expect(page.locator("span").filter({ hasText: "Hello" })).toHaveCount(
    1
  );
}

const course_name = "Introduction to Programming";
const question_name = "What is a variable?";

async function openCourses(page) {
  await page.locator("h2").filter({ hasText: "Courses" }).waitFor();
  await expect(page.locator("h2").filter({ hasText: "Courses" })).toHaveCount(
    1
  );

  await page
    // .locator("button")
    // .locator("div")
    .locator("h3")
    .filter({ hasText: course_name })
    .waitFor();
  await expect(page.locator("h3").filter({ hasText: course_name })).toHaveCount(
    1
  );

  await page.locator("h3").filter({ hasText: course_name }).click();
  await page.locator("h3").filter({ hasText: question_name }).waitFor();
  await expect(
    page.locator("h3").filter({ hasText: question_name })
  ).toHaveCount(1);
}

async function addQuestion(page) {
  const randomId = Math.floor(Math.random() * 100000);
  const question_title = `${randomId} asks: What is a compiler?`;
  const question_text = `${randomId} asks: Explain what a compiler is and how it works.`;

  await page.locator("form").waitFor();

  await page.getByLabel("Question title:").fill(question_title);
  await page.getByLabel("Question text:").fill(question_text);
  await page.locator("button").filter({ hasText: "Create" }).click();

  await page.locator("h3").filter({ hasText: question_title }).waitFor();
  await expect(
    await page.locator("h3").filter({ hasText: question_title }).count()
  ).toBeGreaterThan(0);
}

async function openQuestion(page) {
  await page.locator("h3").filter({ hasText: question_name }).waitFor();
  await page.locator("h3").filter({ hasText: question_name }).click();

  await expect(
    page.locator("h3").filter({ hasText: question_name })
  ).toHaveCount(1);
  await expect(
    page.locator("p").filter({ hasText: "answers aviable" })
  ).toHaveCount(1);
  await expect(
    await page.locator("p").filter({ hasText: "Answer by user" }).count()
  ).toBeGreaterThan(2);
}

async function addAnswer(page) {
  const randomId = Math.floor(Math.random() * 100000);
  const answer_title = `${randomId} responds: A variable is a container for a value.`;

  await expect(page.locator("p").filter({ hasText: answer_title })).toHaveCount(
    0
  );
  await page.locator("form").locator("textarea").fill(answer_title);
  await page.locator("form").locator("button").click();

  await page.locator("p").filter({ hasText: answer_title }).waitFor();
  await expect(page.locator("p").filter({ hasText: answer_title })).toHaveCount(
    1
  );
}

async function addSecondAnswerFail(page) {
  const randomId = Math.floor(Math.random() * 100000);
  const answer_title_2 = `${randomId} responds: I don't know`;

  await page.locator("form").locator("textarea").fill(answer_title_2);
  await page.locator("form").locator("button").click();

  await page.waitForTimeout(1000);
  await expect(
    page.locator("p").filter({ hasText: answer_title_2 })
  ).toHaveCount(0);
}

test("Open course page", async ({ page }) => {
  await init(page);
  await openCourses(page);
});

test("Add question", async ({ page }) => {
  await init(page);
  await openCourses(page);
  await addQuestion(page);
});

test("Open question page", async ({ page }) => {
  await init(page);
  await openCourses(page);
  await openQuestion(page);
});

test("Add answer", async ({ page }) => {
  await init(page);
  await openCourses(page);
  await openQuestion(page);
  await addAnswer(page);
});

test("Add two answers", async ({ page }) => {
  await init(page);
  await openCourses(page);
  await openQuestion(page);
  await addAnswer(page);
  await addSecondAnswerFail(page);
});
