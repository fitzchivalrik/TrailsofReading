<script lang="ts">
  import { afterUpdate, tick } from "svelte";
import type { Script } from "../../../../types";
  import { uncompressJsonFetch } from "../api";
import { updateSrcAttributeToAbsoluteUrl } from "../helper";
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
  let japaneseTextElement: HTMLElement;
  let scriptLine: Script | null = null;

  afterUpdate(async () => {
    console.debug(line);
    if (!line || previousLine == line) return;
    // TODO Why is this needed? Which concept do I misunderstand?
    // -> showingJapanese forces an Update Workaround with beforeUpdate?
    // -> Infinite update loop else :/
    previousLine = line;
    try {
      // TODO Types
      //const response = await fetch(`https://trailsinthedatabase.com/api/script/detail/${line.gameId}/${line.fname}`)
      // const response = await fetch(
      //   `./data/scripts/${line.gameId}/${line.fname}.json`
      // );
      //console.log(s)
      // const script = await response.json();
      const script = await uncompressJsonFetch<Script[]>(
        `./data/scripts/${line.gameId}/${line.fname}.json.bin`
      );
      const sl = script.find((s) => s.row === line.row);
      updateSrcAttributeToAbsoluteUrl(sl);
      scriptLine = sl;
      // NOTE: We are relying on DOM in next lines, so we need to give the renderer time to render
      await tick();
      // NOTE: It's ugly! But it does what I want conveniently okay!
      // See also the note @line114
      if (!japaneseTextElement) return;
      while (japaneseTextElement.firstChild) {
        japaneseTextElement.removeChild(japaneseTextElement.firstChild);
      }
      // console.log(document.querySelectorAll('a'));
      const jpn = sl?.jpnHtmlText ?? "No Japanese Text";
      const eng = sl?.engHtmlText ?? "No English Text";
      if (/<audio/gu.test(eng)) {
        const jpn_lines = jpn.split("<br/><br/>");
        const links = englischTextElement.querySelectorAll("a");
        const nodes = [];
        if (jpn_lines.length !== links.length)
          console.warn(
            `NOT Same line count: ${jpn_lines.length}:${links.length}`
          );
        if (links.length === 1) {
          const e = links[0].cloneNode();
          //@ts-ignore It exists though? TODO
          e.innerHTML = jpn;
          nodes.push(e);
        } else {
          for (let i = 0; i < links.length; i++) {
            const e = links[i].cloneNode();
            //@ts-ignore It exists though? TODO
            e.innerHTML = jpn_lines[i];
            nodes.push(e);
            if (i != links.length - 1) {
              nodes.push(document.createElement("br"));
              nodes.push(document.createElement("br"));
            }
          }
        }
        japaneseTextElement.append(...nodes);
      } else {
        japaneseTextElement.innerHTML = jpn;
      }
    } catch {}
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
    <h4 id="speaker-jpn" class="text speaker">
      {scriptLine?.jpnChrName ?? ""}
    </h4>
    <h2 bind:this={japaneseTextElement} class="text line">
      <!-- {@html japaneseHtml ?? "No Japanese Text"} -->
    </h2>
  {:else}
    <h4 id="speaker-eng" class="speaker">{scriptLine?.engChrName ?? ""}</h4>
    <h2 id="english" class="line">
      {@html scriptLine?.engHtmlText ?? "No English Text"}
    </h2>
  {/if}
{:else}
  <p>Loading...</p>
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
