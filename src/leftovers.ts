// console.log("Fetching place names...");
// const places = read<({ gameId: number; place: string | null })[][]>(
//   `${DATA_ROOT}/places.json`,
//   () =>
//     script_files.map((fa, index) =>
//       fa.map((f) => {
//         let place = null;
//         if (f.engPlaceNames) {
//           if (f.engPlaceNames[0]) {
//             place = f.engPlaceNames[0];
//           } else if (f.engPlaceNames[1]) {
//             place = f.engPlaceNames[1];
//           } else if (f.engPlaceNames[2]) {
//             place = f.engPlaceNames[2];
//           }
//         }
//         return place;
//       })
//         .filter(unique)
//         .map((f) => ({ gameId: index + 1, place: f }))
//     ),
// );

// await read(
//   `${DATA_ROOT}/unique_valid_kklc_groupBy_absolute_counts.json`,
//   () => {
//     type Result = { count: number; percentage: number };
//     const t: Record<number, typeof kklc_absolute_grouped[0] | Result> =
//       { ...kklc_absolute_grouped };
//     Object.keys(kklc_absolute_grouped).forEach((k) => {
//       const kk = k as unknown as keyof typeof t;
//       t[kk] = {
//         count: (t[kk] as typeof kklc_absolute_grouped[0])
//           .length,
//         percentage: 0,
//       };
//     });
//     const sum = Object.values(t).reduce((p, c) => p + (c as Result).count, 0);
//     let counter = 0;
//     Object.keys(kklc_absolute_grouped).forEach((k) => {
//       const kk = k as unknown as keyof typeof t;
//       counter += (t[kk] as Result).count;
//       t[kk] = {
//         count: (t[kk] as Result)
//           .count,
//         percentage: counter / sum,
//       };
//     });
//     return t;
//     // return Object.entries(kklc_absolute_grouped).map(([id, l]) => {
//     //   return {[id]: l.length};
//     // })
//   },
// );

// import { csv2JSON } from "./helpers.ts";

// // const base = "../ZeroField_Hajimari";
// // for await (const dirEntry of Deno.readDir(base)) {
// //   if (dirEntry.isFile && dirEntry.name.endsWith(".csv")) {
// //     await Deno.writeTextFile(
// //       `${base}/${dirEntry.name}`,
// //       csv2JSON(await Deno.readTextFile(`${base}/${dirEntry.name}`), 3),
// //     );
// //   }
// // }
// // const chapter1 = await Deno.readTextFile("../ZeroField_Hajimari/01_Chapter1.csv");
// // await Deno.writeTextFile("../01.json",csv2JSON(chapter1, 3));
// await Deno.writeTextFile(
//   `../kklcd12 - kklcd12.json`,
//   csv2JSON(await Deno.readTextFile(`../kklcd12 - kklcd12.csv`)),
// );

// console.log("Making paths absolute...");
// const kanjiScriptsAbsolute = await read(
//   `${DATA_ROOT}/kanji_scripts_absolute.json`,
//   () =>
//     kanjiScripts.map((s) => ({
//       ...s,
//       engSearchText: s.engSearchText?.replace(REGEX_SRC_ATTRIBUTE, (s) =>
//         `${HOST}${s}`),
//       engHtmlText: s.engHtmlText?.replace(REGEX_SRC_ATTRIBUTE, (s) =>
//         `${HOST}${s}`),
//       jpnSearchText: s.jpnSearchText?.replace(REGEX_SRC_ATTRIBUTE, (s) =>
//         `${HOST}${s}`),
//       jpnHtmlText: s.jpnHtmlText?.replace(REGEX_SRC_ATTRIBUTE, (s) =>
//         `${HOST}${s}`),
//       evoIconHtml: s.evoIconHtml?.replace(REGEX_SRC_ATTRIBUTE, (s) =>
//         `${HOST}${s}`),
//       pcIconHtml: s.pcIconHtml?.replace(REGEX_SRC_ATTRIBUTE, (s) =>
//         `${HOST}${s}`),
//     })),
// );