<script lang="ts">
  import {
    currentLevel,
    audioSetting,
    line,
    lineReset,
    currentLines,
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

  export let open = false;

  function forceLineReset() {
    $lineReset = true;
  }

  function orderChange() {
    //TODO current lines to null too
    $currentLines = null;
    $currentLevel = currentOrdering?.[0];
    forceLineReset();
  }

  function kanjiAndKeyword(id: number) {
    const a =
      $orderSetting === "kklc"
        ? kklc
        : $orderSetting === "wk"
        ? wk
        : $orderSetting === "frequency"
        ? frequency
        : $orderSetting === "heisig6"
        ? heisig6
        : [];
    const entries = a
      .filter((kk) => +kk.id === id)
      .map((kk) => kk.kanji)
      .join(",");
    if (entries.length > 0) {
      return `${entries}`;
    } else if (id === 0) {
      return "None";
    } else {
      return "Not in ordering";
    }
  }

  function sliceIntoChunks(arr: unknown[], chunkSize: number) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  }

  $: currentOrdering =
    $orderSetting === "kklc"
      ? sliceIntoChunks(kklcIds, 100)
      : $orderSetting === "wk"
      ? sliceIntoChunks(wkIds, 10)
      : $orderSetting === "frequency"
      ? sliceIntoChunks(frequencyIds, 100)
      : $orderSetting === "heisig6"
      ? sliceIntoChunks(heisig6Ids, 100)
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

<aside class:open>
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
    {#each currentOrdering as kk, i (i)}
      <details>
        <summary
          >{$orderSetting.toString().toUpperCase()}
          {kk[0]} - {kk[kk.length - 1]}</summary
        >
        <div
          class="inner"
          style={`grid-template-columns: repeat(auto-fill, minmax(${
            $orderSetting === "wk" ? "200px" : "65px"
          }, 1fr));`}
        >
          {#each kk as k, j}
            <label>
              <input
                type="radio"
                name="level"
                value={k}
                bind:group={$currentLevel}
                on:change={forceLineReset}
              />
              {k}
              {kanjiAndKeyword(+k)}
            </label>
          {/each}
        </div>
      </details>
    {/each}
  </p>
</aside>
<div
  on:click={() => (open = false)}
  class="fake-modal"
  class:fake-modal-open={open}
/>

<style>
  .inner {
    display: grid;
    font-family: var(--japanese-font);
    /* grid-auto-rows: minmax(100px, auto); */
  }
  p {
    margin: 1rem auto;
  }
  .fake-modal {
    width: 25%;
    height: 92%;
    position: absolute;
    overflow: hidden;
    left: -100%;
    /* transition: left 0.3s ease-in-out; */
    /* box-shadow:0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05); */
  }
  aside {
    overflow: scroll;
    overflow-x: hidden;
    text-align: center;
    padding-top: 5%;
    position: absolute;
    left: -100%;
    transition: left 0.3s ease-in-out;
    width: 75%;
    height: 92%;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    border-right-width: 2px;
    background-color: var(--accent-bg);
    z-index: 1;
  }

  .fake-modal-open {
    left: 75%;
  }

  .open {
    left: 0;
  }
</style>
