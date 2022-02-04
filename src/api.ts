import { ensureDir } from "https://deno.land/std/fs/mod.ts";
import { API_FILES, API_SCRIPT, HOST, script_url } from "./constants.ts";
import { get } from "./helpers.ts";
import { Script, ScriptFile } from "./types.ts";

export async function fetchScriptFiles(game_id: number, data_root: string) {
  const dir = `${data_root}/${game_id}`;
  await ensureDir(dir);
  return get<ScriptFile[]>(
    `${dir}/files.json`,
    `${HOST}${API_FILES}${game_id}`,
  );
}

export async function fetchScript(
  game_id: number,
  fname: string,
  data_root: string,
  dir: string | null = null,
) {
  dir = dir ?? `${data_root}/${game_id}`;
  await ensureDir(dir);
  return get<Script[]>(
    `${dir}/${fname}.json`,
    script_url(game_id, fname),
  );
  //   .catch((r) => {
  //   console.error(`Error ${game_id}:${fname}, reason? ${r}`);
  //   return ;
  // });
}
