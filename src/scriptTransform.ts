import { fetchScript, fetchScriptFiles } from "./api.ts";
import { API_GAMES, HOST } from "./constants.ts";
import { get, read } from "./helpers.ts";
import { AudioScript, Game, Script } from "./types.ts";
import { lineValid, scriptValid } from "./validator.ts";

export async function fetchScripts(dataRoot: string) {
  console.log("Fetching games...");
  const games = await get<Game[]>(
    `${dataRoot}/games.json`,
    `${HOST}${API_GAMES}`,
  );

  console.log("Fetching list of scripts...");
  const scriptFiles = await Promise.all(
    games.map((g) => fetchScriptFiles(g.id!, dataRoot)),
  );
  console.log("Fetching all scripts...");
  const allScripts = (await Promise.all(
    scriptFiles.map((sfs) =>
      Promise.all(
        sfs.filter(scriptValid).map((sf) =>
          fetchScript(sf.gameId!, sf.fname!, dataRoot)
        ),
      )
    ),
  )).flat(4);

  for (let i = 0; i < allScripts.length; i++) {
    const s = allScripts[i];
    s.engSearchText = s.engSearchText?.replaceAll("<br/>", "");
    s.jpnSearchText = s.jpnSearchText?.replaceAll("<br/>", "");
  }
  return allScripts;
  // return all_scripts.map((s) => {
  //   return {
  //     ...s,
  //     engSearchText: s.engSearchText?.replaceAll("<br/>", ""),
  //     jpnSearchText: s.jpnSearchText?.replaceAll("<br/>", ""),
  //   };
  // });

  // await read<ScriptFile[]>(`${DATA_ROOT}/excluded_scripts.json`, () => {
  //   return script_files.flatMap((sfs) => sfs.filter((sf) => !script_valid(sf)));
  // });
}

export async function filterScripts(dataRoot: string, scripts: Script[]) {
  console.log("Removing invalid lines...");
  const validScripts = await read<Script[]>(
    `${dataRoot}/valid_scripts.json`,
    () => {
      return scripts.filter((l) => lineValid(l));
    },
    2
  );

  console.log("Removing duplicates...");
  return read<Script[]>(
    `${dataRoot}/unique_lines_scripts.json`,
    () => {
      //valid_scripts.filter((v,i,a)=>a.findIndex(t=>(t.jpnSearchText===v.jpnSearchText))===i)
      return [
        ...new Map(validScripts.map((v) => [v.jpnSearchText, v])).values(),
      ];
    },
    2
  );
}

export function addAudioInformationToScripts(scripts: Script[]) {
  console.log("Adding audio information...")
  const audioScripts = scripts as AudioScript[];
  for (let i = 0; i < audioScripts.length; i++) {
    const s = audioScripts[i];
    s.has_audio = s.engHtmlText?.indexOf("<audio") !== -1 ||
      s.jpnHtmlText?.indexOf("<audio") !== -1;
  }
  return audioScripts;
}
