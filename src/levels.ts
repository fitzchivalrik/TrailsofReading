import {
  NOT_IN_FREQUENCY_NUMBER,
  NOT_IN_GRADE_NUMBER,
  NOT_IN_HEISIG5_NUMBER,
  NOT_IN_HEISIG6_NUMBER,
  NOT_IN_JLPT_NUMBER,
  NOT_IN_KANKEN_NUMBER,
  NOT_IN_KKLC_NUMBER,
  NOT_IN_WK_NUMBER,
} from "./constants.ts";
import { read } from "./helpers.ts";
import {
  AudioScript,
  KanjiMuch,
  KanjiMuch_Dirty,
  KKLC,
  KKLC_Dirty,
} from "./types.ts";

export async function generateKanjiScripts(
  dataRoot: string,
  scripts: AudioScript[],
) {
  console.log("Loading levels...");
  const kklc = await loadKKLC();
  const { frequency, wk, grade, jlpt, kanken, heisig5, heisig6 } =
    await loadMuchKanji();

  console.log("Adding Level information...");
  // TODO Add WK/JLPT etc. too
  return read(
    `${dataRoot}/kanji_scripts.json`,
    () => {
      const t = scripts.map((s) => {
        const kanjiOnly = s.jpnSearchText?.matchAll(/\p{sc=Han}+/gu);
        if (kanjiOnly) {
          const kanji = [...kanjiOnly];
          if (kanji.length > 0) {
            const kanjis = kanji.join("").split(/(\p{sc=Han})/gu).filter((s) =>
              s.length !== 0
            );
            const ids = kanjis.reduce<Record<string, number[]>>((acc, cur) => {
              acc.kklc.push(
                kklc.find((kk) => kk.kanji === cur)?.id_kklc ??
                  NOT_IN_KKLC_NUMBER,
              );
              acc.wk.push(
                wk.find((kk) => kk.character === cur)?.wk ?? NOT_IN_WK_NUMBER,
              );
              acc.frequency.push(
                frequency.find((kk) => kk.character === cur)?.frequency_rank ??
                  NOT_IN_FREQUENCY_NUMBER,
              );
              acc.grade.push(
                grade.find((kk) => kk.character === cur)?.grade ??
                  NOT_IN_GRADE_NUMBER,
              );
              acc.jlpt.push(
                jlpt.find((kk) => kk.character === cur)?.jlpt ??
                  NOT_IN_JLPT_NUMBER,
              );
              acc.kanken.push(
                kanken.find((kk) => kk.character === cur)?.kanken ??
                  NOT_IN_KANKEN_NUMBER,
              );
              acc.heisig5.push(
                heisig5.find((kk) => kk.character === cur)?.heisig_id5 ??
                  NOT_IN_HEISIG5_NUMBER,
              );
              acc.heisig6.push(
                heisig6.find((kk) => kk.character === cur)?.heisig_id6 ??
                  NOT_IN_HEISIG6_NUMBER,
              );
              return acc;
            }, {
              kklc: [],
              wk: [],
              frequency: [],
              grade: [],
              jlpt: [],
              kanken: [],
              heisig5: [],
              heisig6: [],
            });
            Object.keys(ids).forEach((k) => {
              ids[k].sort((a, b) => b - a);
            });
            return {
              ...s,
              highest_kklc: highestKanji(ids.kklc, NOT_IN_KKLC_NUMBER),
              highest_wk: highestKanji(ids.wk, NOT_IN_WK_NUMBER),
              highest_frequency_rank: highestKanji(
                ids.frequency,
                NOT_IN_FREQUENCY_NUMBER,
              ),
              highest_grade: highestKanji(ids.grade, NOT_IN_GRADE_NUMBER),
              highest_jlpt: highestKanji(ids.jlpt, NOT_IN_JLPT_NUMBER),
              highest_kanken: highestKanji(ids.kanken, NOT_IN_KANKEN_NUMBER),
              highest_heisig_id5: highestKanji(
                ids.heisig5,
                NOT_IN_HEISIG5_NUMBER,
              ),
              highest_heisig_id6: highestKanji(
                ids.heisig6,
                NOT_IN_HEISIG6_NUMBER,
              ),
            };
          }
        }
        return {
          ...s,
          highest_kklc: 0,
          highest_wk: 0,
          highest_frequency_rank: 0,
          highest_grade: 0,
          highest_jlpt: 0,
          highest_kanken: 0,
          highest_heisig_id5: 0,
          highest_heisig_id6: 0,
        };
      });
      return t;
    },
    2,
    true,
  );
}

async function loadKKLC() {
  return JSON.parse(await Deno.readTextFile("./Kanji_KKLC.json"))
    .map((s: KKLC_Dirty) => { //TODO: UN-dirty and write out (Narrator: It never happened)
      return {
        ...s,
        id_kklc: parseInt(s.id_kklc, 10),
        id_kklc_page: parseInt(s.id_kklc_page, 10),
      };
    }) as KKLC[];
}

async function loadMuchKanji() {
  const muchKanji = JSON.parse(
    await Deno.readTextFile("./kanji_frequency_sorted.json"),
  )
    .map((s: KanjiMuch_Dirty) => {
      return {
        ...s,
        frequency_rank: s.frequency_rank === "999999"
          ? 9998
          : parseInt(s.frequency_rank, 10),
        wk: parseInt(s.wk, 10),
        grade: parseInt(s.grade, 10),
        jlpt: parseInt(s.jlpt, 10),
        kanken: parseInt(s.kanken, 10),
        heisig_id5: parseInt(s.heisig_id5, 10),
        heisig_id6: parseInt(s.heisig_id6, 10),
      };
    }) as KanjiMuch[];
  return {
    frequency: muchKanji.filter((k) => !isNaN(k.frequency_rank)),
    wk: muchKanji.filter((k) => !isNaN(k.wk)),
    grade: muchKanji.filter((k) => !isNaN(k.grade)),
    jlpt: muchKanji.filter((k) => !isNaN(k.jlpt)),
    kanken: muchKanji.filter((k) => !isNaN(k.kanken)),
    heisig5: muchKanji.filter((k) => !isNaN(k.heisig_id5)),
    heisig6: muchKanji.filter((k) => !isNaN(k.heisig_id6)),
  };
}

function highestKanji(ids: number[], outNumber: number) {
  //NOTE: Allow up to three kanji which are not part of the set
  return ids[0] === outNumber
    ? (ids[1] !== undefined)
      ? ids[1] === outNumber
        ? (ids[2] !== undefined)
          ? ids[2] === outNumber
            ? (ids[3] !== undefined) ? ids[3] : ids[2]
            : ids[2]
          : ids[1]
        : ids[1]
      : ids[0]
    : ids[0];
}
