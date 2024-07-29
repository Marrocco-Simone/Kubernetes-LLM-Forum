<script>
  export let course;
  export let selected;
</script>

<div
  class={`flex flex-col gap-1 text-left px-5 py-1 rounded w-full ${selected ? "bg-cyan-400 text-black" : "hover:bg-cyan-200 hover:text-black"}`}
>
  <h3 class="text-xl">{course.name}</h3>
  <p class="pl-5">{course.description}</p>
  <p class="pl-5 italic">{course.question_count} question aviable</p>
</div>
