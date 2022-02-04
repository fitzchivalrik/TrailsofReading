import { ensureDir } from "https://deno.land/std/fs/mod.ts";
import { KanjiScript, MinimalKanji } from "./types.ts";
import { groupBy, read } from "./helpers.ts";
import {
  addAudioInformationToScripts,
  fetchScripts,
  filterScripts,
} from "./scriptTransform.ts";
import { generateKanjiScripts } from "./levels.ts";

const DATA_ROOT = "./data"; // TODO cmd param
console.log("Trails into Anki");
await ensureDir(DATA_ROOT);

const scripts = await filterScripts(DATA_ROOT, await fetchScripts(DATA_ROOT));
const audioScripts = addAudioInformationToScripts(scripts);
const kanjiScripts = await generateKanjiScripts(DATA_ROOT, audioScripts);

console.log("Creating groups...");
const kklcGroup = await createGroup(
  kanjiScripts,
  "highest_kklc",
  "kanji_scripts_kklc_grouped.json",
);
const wkGroup = await createGroup(
  kanjiScripts,
  "highest_wk",
  "kanji_scripts_wk_grouped.json",
);
const frequencyGroup = await createGroup(
  kanjiScripts,
  "highest_frequency_rank",
  "kanji_scripts_frequency_grouped.json",
);
const kankenGroup = await createGroup(
  kanjiScripts,
  "highest_kanken",
  "kanji_scripts_kanken_grouped.json",
);
const jlptGroup = await createGroup(
  kanjiScripts,
  "highest_jlpt",
  "kanji_scripts_jlpt_grouped.json",
);
const gradeGroup = await createGroup(
  kanjiScripts,
  "highest_grade",
  "kanji_scripts_grade_grouped.json",
);
const heisig5Group = await createGroup(
  kanjiScripts,
  "highest_heisig_id5",
  "kanji_scripts_heisig5_grouped.json",
);
const heisig6Group = await createGroup(
  kanjiScripts,
  "highest_heisig_id6",
  "kanji_scripts_heisig6_grouped.json",
);

console.log("Writing groups...");
await Promise.all([
  writeOutGroup(kklcGroup, "kklc", (k) => k.padStart(4, "0")),
  writeOutGroup(wkGroup, "wk", (k) => k.padStart(2, "0")),
  writeOutGroup(frequencyGroup, "frequency", (k) => k.padStart(4, "0")),
  writeOutGroup(kankenGroup, "kanken", (k) => k.padStart(2, "0")),
  writeOutGroup(jlptGroup, "jlpt", (k) => k),
  writeOutGroup(gradeGroup, "grade", (k) => k.padStart(2, "0")),
  writeOutGroup(heisig5Group, "heisig5", (k) => k.padStart(4, "0")),
  writeOutGroup(heisig6Group, "heisig6", (k) => k.padStart(4, "0")),
]);

async function writeOutGroup<T>(
  group: Record<string | number | symbol, T>,
  folder: string,
  name: (s: string) => string,
) {
  await ensureDir(`./gui/public/data/${folder}`);
  return Promise.all(
    Object.keys(group).map((k) => {
      return read(
        `./gui/public/data/${folder}/${name(k)}.json`,
        () => {
          const kk = k as unknown as keyof typeof group;
          return group[kk];
        },
        undefined,
        true,
      );
    }),
  );
}

async function createGroup<K extends keyof KanjiScript>(
  script: KanjiScript[],
  key: K,
  file: string,
) {
  return await read(
    `${DATA_ROOT}/${file}`,
    () => {
      //@ts-ignore Its late and I am too tired for correct typing
      const grouped: Record<string | number | symbol, MinimalKanji[]> = groupBy(
        script,
        //@ts-ignore But, but, but it should work, right? k[key]?
        (k) => k[key],
      );
      Object.keys(grouped).forEach((k) => {
        // TODO There must be a less radical way in TS
        const kk = k as unknown as keyof typeof grouped;
        // TODO Somehow filter nicer? Regex and such would be nice, but this _is_ pretty effective.
        // Anything below is basic of basic and even with >12 a lot is basic.
        const group = k === "0"
          ? grouped[kk].filter((l) => (l.jpnSearchText?.length ?? 0) > 12)
          : grouped[kk];
        group.sort((a, b) =>
          (a.jpnSearchText?.length ?? 0) -
          (b.jpnSearchText?.length ?? 0)
        );
        grouped[kk] = group.map((s) => (
          {
            gameId: s.gameId,
            fname: s.fname,
            scene: s.scene,
            row: s.row,
            has_audio: s.has_audio,
          }
          // s
        ));
      });
      return grouped;
    },
    undefined,
    true,
  );
}
