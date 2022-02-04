import type { Script } from "../../../types";

const DATABASE_HOST = "https://trailsinthedatabase.com/";
export const REGEX_SRC_ATTRIBUTE = /(?<=src=(?:\\"|"))[\w/.]+(?=(?:\\"|"))/gu;

export function updateSrcAttributeToAbsoluteUrl(script: Script) {
  script.engSearchText = script.engSearchText?.replace(
    REGEX_SRC_ATTRIBUTE,
    (s) => `${DATABASE_HOST}${s}`,
  );
  script.engHtmlText = script.engHtmlText?.replace(
    REGEX_SRC_ATTRIBUTE,
    (s) => `${DATABASE_HOST}${s}`,
  );
  script.jpnSearchText = script.jpnSearchText?.replace(
    REGEX_SRC_ATTRIBUTE,
    (s) => `${DATABASE_HOST}${s}`,
  );
  script.jpnHtmlText = script.jpnHtmlText?.replace(
    REGEX_SRC_ATTRIBUTE,
    (s) => `${DATABASE_HOST}${s}`,
  );
  script.evoIconHtml = script.evoIconHtml?.replace(
    REGEX_SRC_ATTRIBUTE,
    (s) => `${DATABASE_HOST}${s}`,
  );
  script.pcIconHtml = script.pcIconHtml?.replace(
    REGEX_SRC_ATTRIBUTE,
    (s) => `${DATABASE_HOST}${s}`,
  );
}
