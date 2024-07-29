<script>
  import { userUuid } from "../stores/stores.js";
  export let courseId;
  export let refresh;
  let title = "";
  let text = "";

  function submit(e) {
    e.preventDefault();

    if (!$userUuid) {
      alert("Please log in to ask a question");
      return;
    }

    if (!courseId) {
      alert("Please select a course to ask a question");
      return;
    }

    if (!title || !text) {
      alert("Please fill in all fields");
      return;
    }

    const body = JSON.stringify({
      title,
      text,
      courseId,
      user_uuid: $userUuid,
    });

    fetch(`/api/questions`, {
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
        title = "";
        text = "";
        refresh();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to submit question");
      });
  }
</script>

<form class="flex flex-col gap-5" on:submit={submit}>
  <label for="title">Question title:</label>
  <input
    id="title"
    placeholder="Title..."
    bind:value={title}
    class="p-3 bg-cyan-600 rounded font-mono placeholder:italic"
    required
  />

  <label for="text">Question text:</label>
  <textarea
    id="text"
    placeholder="Text..."
    bind:value={text}
    class="p-3 bg-cyan-600 rounded font-mono h-44 placeholder:italic"
    required
  />

  <button
    type="submit"
    class="p-3 bg-cyan-700 hover:bg-cyan-300 hover:text-black rounded mx-auto"
    >Create</button
  >
</form>
