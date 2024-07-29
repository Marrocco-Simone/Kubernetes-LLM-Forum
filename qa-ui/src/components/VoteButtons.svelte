<script lang="ts">
  import { userUuid } from "../stores/stores.js";
  export let counter: number;
  export let vote = null;
  export let id: string;
  export let type: "questions" | "answers";
  export let refresh: () => void;

  function giveVote(vote: boolean) {
    fetch(`/api/${type}/${id}/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_uuid: $userUuid,
        vote,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          alert(data.error);
          return;
        }
        refresh();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to submit vote");
      });
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="flex flex-col gap-2 items-center justify-start py-5 px-3 cursor-default"
  on:click={(e) => {
    e.stopPropagation();
    e.preventDefault();
  }}
>
  <button
    class={`text-xl ${vote === true ? "text-green-500" : ""}`}
    on:click={() => giveVote(true)}>▲</button
  >
  <p class="cursor-text">{counter}</p>
  <button
    class={`text-xl ${vote === false ? "text-red-500" : ""}`}
    on:click={() => giveVote(false)}>▼</button
  >
</div>
