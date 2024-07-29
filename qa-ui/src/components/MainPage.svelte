<script>
  import { onMount } from "svelte";
  import { userUuid } from "../stores/stores.js";
  import Course from "./Course.svelte";
  import Question from "./Question.svelte";
  import NewQuestionForm from "./NewQuestionForm.svelte";

  let courses = [];
  let chosenCourseId = "";
  let courseQuestions = [];
  let courseQuestionsVotes = [];

  function fetchCourses() {
    courses = [];
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          alert(data.error);
          return;
        }
        courses = data.courses;
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to fetch courses");
      });
  }

  function chooseCourse(courseId) {
    if (chosenCourseId === courseId) {
      chosenCourseId = "";
      courseQuestions = [];
    } else {
      chosenCourseId = courseId;
      fetchQuestions();
    }
  }

  function fetchQuestions(offset = 0) {
    if (!chosenCourseId) return;
    if (offset === 0) {
      courseQuestions = [];
      courseQuestionsVotes = [];
    }

    fetch(
      `/api/courses/${chosenCourseId}/questions?user_uuid=${$userUuid}&offset=${offset}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          alert(data.error);
          return;
        }
        if (offset === 0) {
          courseQuestions = data.questions;
          courseQuestionsVotes = data.questionsVotes;
          return;
        }

        if (data.questions.length === 0) {
          alert("No more questions to fetch");
          return;
        }

        courseQuestions = [...courseQuestions, ...data.questions];
        courseQuestionsVotes = [
          ...courseQuestionsVotes,
          ...data.questionsVotes,
        ];
        alert(`${data.questions.length} more questions fetched`);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to fetch questions");
      });
  }

  onMount(() => fetchCourses());

  function refresh() {
    fetchCourses();
    fetchQuestions();
  }

  function scrollQuestions(event) {
    if (
      event.target.scrollHeight - event.target.scrollTop ===
      event.target.clientHeight
    ) {
      alert("Fetching more questions");
      fetchQuestions(courseQuestions.length);
    }
  }
</script>

<main
  class="flex portrait:flex-col-reverse w-full h-5/6 portrait:h-auto px-5 gap-5"
>
  <div
    class="landscape:w-1/4 h-full overflow-y-scroll flex flex-col justify-start align-start px-5 gap-5"
  >
    <h2 class="text-2xl">Courses</h2>
    {#each courses as course}
      <button class="w-full" on:click={() => chooseCourse(course.id)}
        ><Course {course} selected={course.id === chosenCourseId} /></button
      >
    {/each}
  </div>

  <div
    class={`landscape:w-1/2 h-full ${courseQuestions.length === 0 ? "h-auto" : "portrait:h-screen"} overflow-y-scroll border-x-2 flex flex-col justify-start align-start px-5 pb-5 gap-5`}
    on:scroll={scrollQuestions}
  >
    <div class="flex justify-between items-center">
      <h2 class="text-2xl">Questions of the course</h2>
      <button
        class="italic border rounded p-2"
        on:click={() => fetchQuestions()}>Refresh</button
      >
    </div>
    {#if !chosenCourseId}
      <p>Select a course to view questions</p>
    {:else}
      {#each courseQuestions as question}
        <a
          href="/questions/?questionId={question.id}"
          class="hover:bg-cyan-200 hover:text-black hover:border-black rounded"
          ><Question
            {question}
            questionVote={courseQuestionsVotes.find(
              (q) => q.question_id === question.id
            )}
            refresh={fetchQuestions}
          /></a
        >
      {/each}
    {/if}
  </div>

  <div
    class="landscape:w-1/4 h-full overflow-y-scroll flex flex-col justify-start align-start px-5 gap-5"
  >
    <h2 class="text-2xl">Ask a new question</h2>
    {#if !chosenCourseId}
      <p>Select a course to ask a new question</p>
    {:else}
      <NewQuestionForm courseId={chosenCourseId} {refresh} />
    {/if}
  </div>
</main>
