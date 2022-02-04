<script lang="ts">
  import {
    currentLevel,
    audioSetting,
    line,
    lineReset,
    orderSetting,
  } from "../../lib/store";
  import kklcIds from "../../assets/kklc-ids.json";
  import kklc from "../../assets/kklc.json";
  import wk from "../../assets/wk.json";
  import wkIds from "../../assets/wk-ids.json";
  import heisig6 from "../../assets/heisig6.json";
  import heisig6Ids from "../../assets/heisig6-ids.json";
  import frequency from "../../assets/frequency.json";
  import frequencyIds from "../../assets/frequency-ids.json";

  export let prevLine = () => {};
  export let nextLine = () => {};
  export let length = 0;

  function forceLineReset() {
    $lineReset = true;
  }

  function orderChange() {
    forceLineReset();
    $currentLevel = currentOrdering?.[0]
  }

  function kanjiAndKeyword(id: number) {
    const a = $orderSetting === "kklc"
      ? kklc
      : $orderSetting === "wk"
      ? wk
      : $orderSetting === "frequency"
      ? frequency
      : $orderSetting === "heisig6"
      ? heisig6
      : [];
    const entries = a.filter((kk) => +kk.id === id).map(kk => kk.kanji).join(",");
    if (entries.length > 0) {
      return `${entries}`;
    } else if (id === 0) {
      return "None";
    } else {
      return "Not in ordering";
    }
  }

  $: currentOrdering =
    $orderSetting === "kklc"
      ? kklcIds
      : $orderSetting === "wk"
      ? wkIds
      : $orderSetting === "frequency"
      ? frequencyIds
      : $orderSetting === "heisig6"
      ? heisig6Ids
      : [];
</script>

<svelte:window
  on:keyup={(e) => {
    switch (e.key) {
      case "a":
        e.preventDefault();
        $audioSetting = "audioOnly";
        forceLineReset();
        break;
      case "s":
        e.preventDefault();
        $audioSetting = "textOnly";
        forceLineReset();
        break;
      case "d":
        e.preventDefault();
        $audioSetting = "textAndAudio";
        forceLineReset();
        break;
    }
  }}
/>

<header>
  <p>
    <label>
      <input
        type="radio"
        name="order"
        value="kklc"
        bind:group={$orderSetting}
        on:change={orderChange}
      />
      KKLC
    </label>
    <label>
      <input
        type="radio"
        name="order"
        value="wk"
        bind:group={$orderSetting}
        on:change={orderChange}
      />
      WK
    </label>
    <label>
      <input
        type="radio"
        name="order"
        value="frequency"
        bind:group={$orderSetting}
        on:change={orderChange}
      />
      Frequency
    </label>
    <label>
      <input
        type="radio"
        name="order"
        value="heisig6"
        bind:group={$orderSetting}
        on:change={forceLineReset}
      />
      Heisig (6th)
    </label>
  </p>
  <p>
    <label>
      <select id="select" bind:value={$currentLevel} on:change={forceLineReset}>
        {#each currentOrdering as k (k)}
          <option value={k}
            >{k}
            {kanjiAndKeyword(+k)}
          </option>
        {/each}
      </select>
      Highest Kanji
    </label>
  </p>
  <p>
    <label>
      <input
        type="radio"
        name="audio"
        value="audioOnly"
        bind:group={$audioSetting}
        on:change={forceLineReset}
      />
      With Audio
    </label>
    <label>
      <input
        type="radio"
        name="audio"
        value="textOnly"
        bind:group={$audioSetting}
        on:change={forceLineReset}
      />
      Without Audio
    </label>
    <label>
      <input
        type="radio"
        name="audio"
        value="textAndAudio"
        bind:group={$audioSetting}
        on:change={forceLineReset}
      />
      Both
    </label>
  </p>
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
  select,
  option {
    font-family: var(--japanese-font);
  }

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
