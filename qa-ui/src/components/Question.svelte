<script>
  import VoteButtons from "./VoteButtons.svelte";
  import formatTimestamp from "../functions/formatTimestamp";
  import { userUuid } from "../stores/stores";

  export let question;
  export let questionVote = null;
  export let refresh;

  const text_by_line = question.text.split("\n");
</script>

<div class="flex px-5 py-1">
  <VoteButtons
    counter={question.positive_votes_count - question.negative_votes_count}
    vote={questionVote?.vote}
    id={question.id}
    type="questions"
    {refresh}
  />
  <div class="flex flex-col w-full gap-1">
    <h3 class="text-xl">{question.title}</h3>
    <p class="italic">
      Asked by user "{question.user_uuid}"
      {#if $userUuid === question.user_uuid}
        <span class="text-red-500"> (you)</span>
      {/if}
    </p>
    <p class="italic">
      Created at: {formatTimestamp(question.created_at)}
      {#if question.created_at !== question.last_updated}
        / Last updated: {formatTimestamp(question.last_updated)}
      {/if}
    </p>
    <p
      class="p-7 font-mono border border-cyan-900 rounded bg-cyan-100 text-cyan-900"
    >
      {#each text_by_line as line}
        <p>{line}</p>
      {/each}
    </p>
    <p class="italic">{question.answer_count} answers aviable</p>
  </div>
</div>
