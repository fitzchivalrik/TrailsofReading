<script lang="ts">
  import { swipe } from "svelte-gestures";
  import { uncompressJsonFetch } from "./lib/api";
  import Header from "./lib/components/Header.svelte";
  import Line from "./lib/components/Line.svelte";
  import ReloadPrompt from "./lib/components/ReloadPrompt.svelte";
  import {
    currentLevel,
    audioSetting,
    line,
    lineReset,
    orderSetting,
  } from "./lib/store";

  let currentLines = null;
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
    if (+$line + 1 < (currentLines?.length ?? 0)) {
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
    currentLines = null;
    console.debug(`Fetching ./data/${$orderSetting}/${$currentLevel}.json`);
    uncompressJsonFetch<any>(
      `./data/${$orderSetting}/${$currentLevel}.json.bin`
    )
      .then((a) => {
        // TODO types for the JSON
        currentLines =
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
<Header length={currentLines?.length ?? 0} {prevLine} {nextLine} />
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
  {#if currentLines === null}
    <div>Loading...
      (or stuck, if there is nothing selected in the dropdown, just select something) </div>
    <!-- TODO Loading indicator -->
  {:else}
    <div>
      <Line bind:showingJapanese line={currentLines[$line]} />
    </div>
  {/if}
  <div class="content">
    <!-- <div class="image-container" id="face">
    </div> -->
  </div>
</main>

<footer>
  <p>
    WIP, WIP everywhere.
    <a href="https://github.com/fitzchivalrik/TrailsofReading">Source Code</a>
  </p>
  <small>
    Favicon and logo by KanjiVG. KanjiVG is copyright © 2009-2018 Ulrich Apel
    and released under the Creative Commons Attribution-Share Alike 3.0 license.
  </small>
</footer>

<ReloadPrompt />

<style>
  @import url("simpledotcss/simple.min.css");

  :root {
    --japanese-font: "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", Osaka,
      メイリオ, Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", "ＭＳ ゴシック",
      "MS Gothic", "Noto Sans CJK JP", TakaoPGothic, sans-serif;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --accent: #cf3e3e;
    }
  }

  footer {
    grid-column: 1/-1;
  }

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
