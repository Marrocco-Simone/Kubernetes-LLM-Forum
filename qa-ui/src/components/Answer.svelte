<script>
  import VoteButtons from "./VoteButtons.svelte";
  import formatTimestamp from "../functions/formatTimestamp";
  import { userUuid } from "../stores/stores";

  export let answer;
  export let answerVote = null;
  export let refresh;

  const text_by_line = answer.text.split("\n");
</script>

<div class="flex">
  <VoteButtons
    counter={answer.positive_votes_count - answer.negative_votes_count}
    vote={answerVote?.vote}
    id={answer.id}
    type="answers"
    {refresh}
  />
  <div class="flex flex-col w-full gap-1">
    <p class="italic">
      Answer by user "{answer.user_uuid}"
      {#if $userUuid === answer.user_uuid}
        <span class="text-red-500"> (you)</span>
      {/if}
    </p>
    <p class="italic">
      Created at: {formatTimestamp(answer.created_at)}
      {#if answer.created_at !== answer.last_updated}
        / Last updated: {formatTimestamp(answer.last_updated)}
      {/if}
    </p>
    <p class="p-7 font-mono rounded bg-cyan-100 text-cyan-900">
      {#each text_by_line as line}
        {line}<br />
      {/each}
    </p>
  </div>
</div>
