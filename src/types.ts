import type { components } from "./trails_in_the_database";

export type Game = components["schemas"]["Game"];
export type ScriptFile = components["schemas"]["File"];
export type GameCharacter = components["schemas"]["GameCharacter"];
export type Script = components["schemas"]["Script"];
export type AudioScript = Script & { has_audio: boolean };
export type Stat = components["schemas"]["Stat"];

export type KanjiScript = AudioScript & {
  highest_kklc: number;
  highest_wk: number;
  highest_frequency_rank: number;
  highest_grade: number;
  highest_jlpt: number;
  highest_kanken: number;
  highest_heisig_id5: number;
  highest_heisig_id6: number;
};

export type MinimalKanji = {
  gameId?: number;
  fname?: string;
  scene?: string;
  row?: number;
  has_audio?: number;
  highest_kklc?: number;
  highest_wk?: number;
  highest_frequency_rank?: number;
  highest_grade?: number;
  highest_jlpt?: number;
  highest_kanken?: number;
  highest_heisig_id5?: number;
  highest_heisig_id6?: number;
  jpnSearchText?: string,
};

type Override<T1, T2> = Omit<T1, keyof T2> & T2;
export type KKLC = Override<KKLC_Dirty, {
  id_kklc: number;
  id_kklc_page: number;
}>;

export type KKLC_Dirty = {
  kanji: string;
  keyword_kklc: string;
  id_kklc: string;
  id_kklc_page: string;
  kklc_v1_j: string;
  kklc_v1_r: string;
  kklc_v1_e: string;
  kklc_v2_j: string;
  kklc_v2_r: string;
  kklc_v2_e: string;
  kklc_v3_j: string;
  kklc_v3_r: string;
  kklc_v3_e: string;
  kklc_v4_j: string;
  kklc_v4_r: string;
  kklc_v4_e: string;
};

export type KanjiMuch = Override<KanjiMuch_Dirty, {
  frequency_rank: number;
  wk: number;
  grade: number;
  jlpt: number;
  kanken: number;
  heisig_id5: number;
  heisig_id6: number;
}>;

export type KanjiMuch_Dirty = {
  character: string;
  frequency_rank: string; //number
  wk: string; //number
  grade: string; //number
  jlpt: string; //number
  kanken: string; //number
  heisig_id5: string; //number
  heisig_id6: string; //number
  onyomi: string; // Array
  kunyomi: string; // Array
  nanori: string; // Array
  primitives: string;
  primitive_alternatives: string;
  radicals: string;
  primitive_of: string;
  words_default: string; // Array of tuples
};
