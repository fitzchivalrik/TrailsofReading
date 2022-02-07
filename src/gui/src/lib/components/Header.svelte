<script lang="ts">
  import {
    line,
  } from "../../lib/store";


  export let prevLine = () => {};
  export let nextLine = () => {};
  export let length = 0;



</script>

<header>
  <nav>
    <button class="prev" on:click|preventDefault|stopPropagation={prevLine}
      >Prev</button
    >
    <span id="counter">
      {(length === 0 ? 0 : +$line + 1)
        .toString()
        .padStart(length.toString().length, "0")} / {length}
    </span>
    <button class="next" on:click|preventDefault|stopPropagation={nextLine}
      >Next</button
    >
  </nav>
</header>

<style>

  nav {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  nav > span {
    min-width: 150px;
  }
</style>
