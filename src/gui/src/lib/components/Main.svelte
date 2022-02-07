<script lang="ts">
  import { swipe } from "svelte-gestures";
  import { uncompressJsonFetch } from "../api";
  import Header from "./Header.svelte";
  import Line from "./Line.svelte";
  import { fade } from "svelte/transition";

  import {
    currentLevel,
    audioSetting,
    line,
    lineReset,
    currentLines,
    orderSetting,
  } from "../store";

  let showingJapanese = true;

  function forceLineReset() {
    $lineReset = true;
  }

  function prevLine() {
    if (+$line - 1 >= 0) {
      $line = +$line - 1;
      showingJapanese = true;
      return true;
    }
    return false;
  }

  function nextLine(): boolean {
    if (+$line + 1 < ($currentLines?.length ?? 0)) {
      $line = +$line + 1;
      showingJapanese = true;
      return true;
    }
    return false;
  }

  function changeCurrentLevel(next = false) {
    const opt = document.querySelector(`option[value='${$currentLevel}']`);
    const sib = (
      next ? opt?.nextSibling : opt?.previousSibling
    ) as HTMLOptionElement;
    if (sib?.value) {
      forceLineReset();
      $currentLevel = sib.value;
      return true;
    }
    return false;
  }

  $: {
    // TODO This needs be redone completly
    (async function () {
      $currentLines = null;
      console.debug(`Fetching ./data/${$orderSetting}/${$currentLevel}.json`);
      uncompressJsonFetch<any>(
        `./data/${$orderSetting}/${$currentLevel}.json.bin`
      ).then((a) => {
        // TODO types for the JSON
        $currentLines =
          $audioSetting === "textAndAudio"
            ? a
            : $audioSetting === "textOnly"
            ? a.filter((l) => !l.has_audio)
            : a.filter((l) => l.has_audio);
        if ($lineReset) {
          $line = 0;
          $lineReset = false;
        }
        showingJapanese = true;
      });
    })();
  }
</script>

<svelte:window
  on:keydown={(e) => {
    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        nextLine();
        break;
      case "ArrowLeft":
        e.preventDefault();
        prevLine();
        break;
      case "ArrowUp":
        if (changeCurrentLevel(false)) e.preventDefault();
        break;
      case "ArrowDown":
        if (changeCurrentLevel(true)) e.preventDefault();
        break;
      default:
        break;
    }
  }}
/>
<svelte:body
  use:swipe={{
    timeframe: 300,
    minSwipeDistance: 60,
    touchAction: "pan-y",
  }}
  on:swipe={(e) => {
    if (e.detail.direction === "left") {
      e.stopPropagation();
      e.preventDefault();
      nextLine();
    } else if (e.detail.direction === "right") {
      e.stopPropagation();
      e.preventDefault();
      prevLine();
    }
  }} />
<Header length={$currentLines?.length ?? 0} {prevLine} {nextLine} />
<main
  on:click|stopPropagation|preventDefault={() => {
    // TODO Might this be the worst hack I've ever done yet?
    // Might be able to get rid of it when preprocessing markup
    // -> No preprocessing of markup anymore as we fetch the script files
    // directly. Maybe runtime processing? It was a pain with the regex though...
    if ([...document.querySelectorAll("audio")].some((a) => !a.paused)) {
    } else {
      showingJapanese = !showingJapanese;
      // if (!nextLine()) {
      //   changeKklcEntry(true);
      // }
    }
  }}
>
  {#if $currentLines === null}
    <div in:fade>
      Loading... (or stuck, if this persists, select something (again) please)
    </div>
    <!-- TODO Loading indicator -->
  {:else}
    <Line bind:showingJapanese line={$currentLines[$line]} />
  {/if}
</main>

<style>
  main {
    grid-column: 1/-1;
    width: 96%;
    height: 96%;
    min-height: 33vh;
    padding: 2%;
    display: flex;
    justify-content: center;
  }
</style>
