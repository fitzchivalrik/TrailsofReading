import { Script, ScriptFile } from "./types.ts";
import {
  BLOCKLIST_LINE,
  BLOCKLIST_PLACES,
  BLOCKLIST_SCRIPT_FILES,
  ALLOWLIST_SCRIPT_FILES,
REGEX_JAPANESE_ONLY,
} from "./constants.ts";

// TODO
export function isKey<T>(
  game_id: number,
  type: { new (...args: unknown[]): T },
): game_id is keyof typeof type {
  return (game_id as keyof typeof type) !== undefined;
}

export function scriptValid(script_file: ScriptFile): boolean {
  if (script_file.gameId && script_file.fname) {
    // TODO There is 1000% a better way to express/do this in TS
    const key_allow = script_file.gameId as keyof typeof ALLOWLIST_SCRIPT_FILES;
    if (ALLOWLIST_SCRIPT_FILES[key_allow]?.includes(script_file.fname)) {
      return true;
    }
    const key_block = script_file.gameId as keyof typeof BLOCKLIST_SCRIPT_FILES;
    if (
      BLOCKLIST_SCRIPT_FILES[key_block] &&
      BLOCKLIST_SCRIPT_FILES[key_block].includes(script_file.fname)
    ) {
      return false;
    } else if (
      // All 'aXXXX' seem to be dev scripts
      script_file.fname.startsWith("a") || script_file.fname === "debug"
    ) {
      return false;
    } else if (
      script_file.engPlaceNames &&
      script_file.engPlaceNames.some((p) => BLOCKLIST_PLACES.includes(p))
    ) {
      return false;
    } else if (
      script_file.engChrNames === null ||
      script_file.engChrNames === undefined ||
      script_file.engChrNames?.length === 0
    ) {
      if (
        script_file.jpnChrNames === null ||
        script_file.jpnChrNames === undefined
      ) {
        return false;
      } else return script_file.jpnChrNames.length !== 0;
    }
    return script_file.engChrNames.length !== 0; // Should be always true at this point
  }
  return false;
}

export function lineValid(line: Script, use_blocklist = false): boolean {
  if (line.jpnSearchText?.trim().length === 0) {
    return false;
  }

  if (use_blocklist &&
    BLOCKLIST_LINE.some((b) =>
      //TODO JPN search text only?
      b.test(line.engSearchText ?? "") || b.test(line.jpnSearchText ?? "")
    )
  ) {
    return false;
  }
  // English text has only japanese? Leftover debug line or smth.
  if (REGEX_JAPANESE_ONLY.test(line.engSearchText ?? "")) {
    return false;
  }
  return true;
}
