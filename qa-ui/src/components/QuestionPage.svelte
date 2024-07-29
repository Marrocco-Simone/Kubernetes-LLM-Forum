<script>
  import { onMount } from "svelte";
  import { userUuid } from "../stores/stores.js";
  import Question from "./Question.svelte";
  import Answer from "./Answer.svelte";
  import NewAnswerForm from "./NewAnswerForm.svelte";

  const questionId = new URLSearchParams(document.location.search).get(
    "questionId"
  );
  let question;
  let questionVote;
  let answers = [];
  let answersVotes = [];

  function fetchQuestion() {
    question = null;
    questionVote = null;
    fetch(`/api/questions/${questionId}?user_uuid=${$userUuid}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          alert(data.error);
          return;
        }
        question = data.question;
        questionVote = data.questionVote;
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to fetch question");
      });
  }

  function fetchAnswers(offset = 0) {
    if (offset === 0) {
      answers = [];
      answersVotes = [];
    }
    fetch(
      `/api/questions/${questionId}/answers?user_uuid=${$userUuid}&offset=${offset}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          alert(data.error);
          return;
        }
        if (offset === 0) {
          answers = data.answers;
          answersVotes = data.answersVotes;
          return;
        }

        if (data.answers.length === 0) {
          alert("No more answers");
          return;
        }

        answers = [...answers, ...data.answers];
        answersVotes = [...answersVotes, ...data.answersVotes];
        alert(`${data.answers.length} more answers fetched`);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to fetch answers");
      });
  }

  function refresh() {
    fetchQuestion();
    fetchAnswers();
  }

  onMount(() => refresh());

  function scrollAnswers(event) {
    if (
      event.target.scrollHeight - event.target.scrollTop ===
      event.target.clientHeight
    ) {
      alert("Fetching more answers");
      fetchAnswers(answers.length);
    }
  }
</script>

<main
  class="flex flex-col gap-5 landscape:px-12 portrait:px-2 w-full h-5/6 overflow-y-scroll"
  on:scroll={scrollAnswers}
>
  <div class="flex justify-between items-center">
    <a href="/" class="text-white hover:text-cyan-200 flex items-center gap-3"
      ><div class="text-3xl">←</div>
      Back to main page</a
    >
    <button class="italic border rounded p-2" on:click={() => refresh()}
      >Refresh</button
    >
  </div>
  {#if !questionId || !question}
    <div>No question with specified ID</div>
  {:else}
    {#if question}
      <Question {question} {questionVote} refresh={fetchQuestion} />
      <div class="landscape:pl-32 landscape:pr-16 portrait:px-2">
        <NewAnswerForm {questionId} {refresh} />
      </div>
    {/if}

    <div
      class="flex flex-col gap-5 landscape:pl-24 landscape:pr-16 portrait:px-2"
    >
      {#each answers as answer}
        <Answer
          {answer}
          answerVote={answersVotes.find((a) => a.answer_id === answer.id)}
          refresh={fetchAnswers}
        />
      {/each}
    </div>
  {/if}
</main>
