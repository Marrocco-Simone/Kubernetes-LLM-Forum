<script>
  import { userUuid } from "../stores/stores.js";
  export let questionId;
  export let refresh;
  let text = "";

  function submit(e) {
    e.preventDefault();

    if (!$userUuid) {
      alert("Please log in to ask a question");
      return;
    }

    if (!questionId) {
      alert("Please select a course to ask a question");
      return;
    }

    if (!text) {
      alert("Please fill in all fields");
      return;
    }

    const body = JSON.stringify({
      text,
      questionId,
      user_uuid: $userUuid,
    });

    fetch(`/api/answers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          alert(data.error);
          return;
        }
        text = "";
        refresh();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to submit answer");
      });
  }
</script>

<form
  class="flex gap-10 portrait:flex-col-reverse portrait:justify-center"
  on:submit={submit}
>
  <!-- svelte-ignore a11y-positive-tabindex -->
  <button
    type="submit"
    class="p-3 bg-cyan-700 hover:bg-cyan-300 hover:text-black rounded m-auto"
    tabindex="2">Create</button
  >

  <!-- svelte-ignore a11y-positive-tabindex -->
  <textarea
    id="text"
    placeholder="Write an answer..."
    bind:value={text}
    class="w-full h-44 p-3 bg-cyan-600 rounded font-mono placeholder:italic"
    required
    tabindex="1"
  />
</form>
