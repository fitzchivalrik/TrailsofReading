<script lang="ts">
  import Main from "./lib/components/Main.svelte";
  import Footer from "./lib/components/Footer.svelte";
  import ReloadPrompt from "./lib/components/ReloadPrompt.svelte";
import Sidebar from "./lib/components/Sidebar.svelte";
import Hamburger from "./lib/components/Hamburger.svelte";

  let open = false;
</script>

<Hamburger bind:open/>
<Sidebar bind:open/>
<Main />

<Footer />

<ReloadPrompt />

<style>
  @import url("simpledotcss/simple.min.css");

  :root {
    --japanese-font: "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", Osaka,
      メイリオ, Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", "ＭＳ ゴシック",
      "MS Gothic", "Noto Sans CJK JP", TakaoPGothic, sans-serif;
    --accent: #d87f7f;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --accent: #cf3e3e;
    }
  }
</style>
