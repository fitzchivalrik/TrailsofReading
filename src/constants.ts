export const HOST = "https://trailsinthedatabase.com/";
export const API_FILES = "api/file?game_id=";
export const API_GAMES = "api/game";
export const API_SCRIPT = "api/script/detail/"; //{gameid}/{fname}"

export const NOT_IN_KKLC_NUMBER = 2301;
export const NOT_IN_WK_NUMBER = 61;
export const NOT_IN_FREQUENCY_NUMBER = 9999;
export const NOT_IN_KANKEN_NUMBER = 11;
export const NOT_IN_JLPT_NUMBER = 6;
export const NOT_IN_GRADE_NUMBER = 11;
export const NOT_IN_HEISIG5_NUMBER = 3031;
export const NOT_IN_HEISIG6_NUMBER = 3001;

export const script_url = (gameId: number, fname: string) =>
  `${HOST}${API_SCRIPT}${gameId}/${fname}`;

export const BLOCKLIST_PLACES = [
  "map",
  "map1",
  "★Unused",
  "a0000",
  "a",
];
export const BLOCKLIST_SCRIPT_FILES = {
  3: [
    "t0001_5",
    //"r1204_pc" // Door TODO: Setting for set and exluding games
  ],
  // NOTE: Plus every one starting with 'a' ? 1: 2: 3: 4:true 5:true 6:true 7:true 8:true 9:true 10:true
};

// NOTE: Those would have been filtered while e.g. no character names or such, but contain e.g.
// the lengthy story summaries, which are nice to include as difficult exercises
export const ALLOWLIST_SCRIPT_FILES = {
  2: [
    "t5200",
  ],
  3: [
    "c1401",
  ],
  7: [
    "c2000",
    "e3500",
  ],
  9: [
    "e3500",
  ],
};


//TODO Needs to be done on client now
export const REGEX_SRC_ATTRIBUTE = /(?<=src=(?:\\"|"))[\w/.]+(?=(?:\\"|"))/gu;
export const REGEX_JAPANESE_ONLY = /^-─ー[\p{sc=Han}\p{sc=Katakana}\p{sc=Hiragana}～。…！？♪１２３、　“ぁっ ]+$/gu;

export const BLOCKLIST_LINE = [
  /0[xX][\da-f]+/gui, //Received item(0x382); Found 0x270e in chest.
  /デバッグ/gu,
  // TODO ...This regex should contain all following, no?
  // TODO Well, we stopped using the blocklist anyway so ¯\_(ツ)_/¯
  REGEX_JAPANESE_ONLY,
  /^\p{P}+/ug,
  /^[-─ー…！？　～。、]+$/ug,
  /^\p{P}*\p{sc=Katakana}+…*\p{P}*$/gu,
  /^\p{P}*\p{sc=Hiragana}+…*\p{P}*$/gu,
  /^\p{P}*\p{sc=Latin}+\p{P}*$/gu,
];
