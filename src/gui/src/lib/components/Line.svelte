<script lang="ts">
  import { afterUpdate, beforeUpdate, tick } from "svelte";
  import type { Script } from "../../../../types";
  import { uncompressJsonFetch } from "../api";
  import { updateSrcAttributeToAbsoluteUrl } from "../helper";
  import { fade } from "svelte/transition";
  export let line: {
    gameId: number;
    fname: string;
    row: number;
    scene: number;
    has_audio: boolean;
  } = null;

  let previousLine: {
    gameId: number;
    fname: string;
    row: number;
    scene: number;
    has_audio: boolean;
  } = null;
  export let showingJapanese = true;

  let englischTextElement: HTMLElement;
  let scriptLine: Script | null = null;
  let computedJapaneseHtml: String = null;

  beforeUpdate(async () => {
    if (!line || previousLine == line) return;
    // TODO Why is this needed? Which concept do I misunderstand?
    // -> showingJapanese forces an Update Workaround with beforeUpdate?
    // -> Infinite update loop else :/
    previousLine = line;
    scriptLine = null;
    try {
      const script = await uncompressJsonFetch<Script[]>(
        `./data/scripts/${line.gameId}/${line.fname}.json.bin`
      );
      const sl = script.find((s) => s.row === line.row);
      updateSrcAttributeToAbsoluteUrl(sl);
      scriptLine = sl;
    } catch (e) {
      console.error(e);
    }
  });

  afterUpdate(() => {
    if (!scriptLine) return;
    // NOTE: It's ugly! But it does what I want conveniently okay!
    // See also the note @line114

    // console.log(document.querySelectorAll('a'));
    const jpn = scriptLine?.jpnHtmlText ?? "No Japanese Text";
    const eng = scriptLine?.engHtmlText ?? "No English Text";
    if (/<audio/gu.test(eng)) {
      const jpn_lines = jpn.split("<br/><br/>");
      const links = englischTextElement.querySelectorAll("a");
      const dummy = document.createElement("div");
      if (jpn_lines.length !== links.length)
        console.warn(
          `NOT Same line count: ${jpn_lines.length}:${links.length}`
        );
      if (links.length === 1) {
        const e = links[0].cloneNode();
        //@ts-ignore It exists though? TODO
        e.innerHTML = jpn;
        dummy.append(e);
      } else {
        for (let i = 0; i < links.length; i++) {
          const e = links[i].cloneNode();
          //@ts-ignore It exists though? TODO
          e.innerHTML = jpn_lines[i];
          dummy.append(e);
          if (i != links.length - 1) {
            dummy.append(document.createElement("br"));
            dummy.append(document.createElement("br"));
          }
        }
      }
      computedJapaneseHtml = dummy.innerHTML;
    } else {
      computedJapaneseHtml = jpn;
    }
  });

  // $: console.log(line)
</script>

<svelte:window
  on:keydown={(e) => {
    switch (e.key) {
      case " ":
        e.preventDefault();
        showingJapanese = !showingJapanese;
        break;
      default:
        break;
    }
  }}
  on:keyup={(e) => {
    switch (e.key) {
      // NOTE: I think that is not the worst hack I've ever done.
      case "z":
        e.preventDefault();
        document.querySelectorAll("audio")?.[0]?.play();
        break;
      case "x":
        e.preventDefault();
        document.querySelectorAll("audio")?.[1]?.play();
        break;
      case "c":
        e.preventDefault();
        document.querySelectorAll("audio")?.[2]?.play();
        break;
      case "v":
        e.preventDefault();
        document.querySelectorAll("audio")?.[3]?.play();
        break;
    }
  }}
/>
{#if scriptLine}
{#if showingJapanese}
  <div in:fade={{duration: 150}}>
      <h4 id="speaker-jpn" class="text speaker">
        {scriptLine?.jpnChrName ?? ""}
      </h4>
      <h2 class="text line">
        {@html computedJapaneseHtml ?? "No Japanese Text"}
      </h2>
    </div>
  {:else}
    <div in:fade={{duration: 150}}>
      <h4 id="speaker-eng" class="speaker">
        {scriptLine?.engChrName ?? ""}
      </h4>
      <h2 id="english" class="line">
        {@html scriptLine?.engHtmlText ?? "No English Text"}
      </h2>
    </div>
  {/if}
{:else}
  <p in:fade={{duration: 150}}>Loading...</p>
{/if}

<!--
  NOTE: This invisible div is abused to get the audio outta the engHtmlText
  Its not always nicely formatted so doing it via a regex was a pain and got unwiedly fast,
  and instead of trying to parse the HTML ourselves, we let the browser do it's job. x)
-->
<div style="display: none;">
  <h2 bind:this={englischTextElement} class="line">
    {@html scriptLine?.engHtmlText ?? "No English Text"}
  </h2>
</div>

<style>
  h2 {
    margin-top: 0;
  }

  .speaker {
    margin-left: -1%;
  }

  .text {
    font-family: var(--japanese-font);
  }
</style>
