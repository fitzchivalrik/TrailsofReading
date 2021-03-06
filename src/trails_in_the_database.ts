/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/api/file": {
    get: operations["getFileByGameId"];
  };
  "/api/chr": {
    get: operations["getCharacters_1"];
  };
  "/api/chr/detail": {
    get: operations["getCharacterDetails"];
  };
  "/api/chr/detail/stat": {
    get: operations["getCharacterDetailsStats"];
  };
  "/api/game": {
    get: operations["getGames"];
  };
  "/api/script/detail/{gameId}/{fname}": {
    get: operations["getDetail"];
  };
  "/api/script/search/stat": {
    get: operations["count"];
  };
  "/api/script/search": {
    get: operations["search"];
  };
}

export interface components {
  schemas: {
    File: {
      /** Format: int32 */
      gameId?: number;
      fname?: string;
      /** Format: int64 */
      rows?: number;
      engPlaceNames?: string[];
      jpnPlaceNames?: string[];
      engChrNames?: string[];
      jpnChrNames?: string[];
    };
    GameCharacter: {
      engChrName?: string;
      jpnChrName?: string;
      gameId?: number[];
      /** Format: int64 */
      rows?: number;
    };
    Game: {
      /** Format: int32 */
      id?: number;
      titleEng?: string;
      titleJpnRoman?: string;
      titleJpn?: string;
      /** Format: int32 */
      rows?: number;
    };
    Stat: {
      game?: components["schemas"]["Game"];
      /** Format: int32 */
      rows?: number;
    };
    Script: {
      /** Format: int32 */
      gameId?: number;
      fname?: string;
      scene?: string;
      /** Format: int64 */
      row?: number;
      engChrName?: string;
      engSearchText?: string;
      engHtmlText?: string;
      jpnChrName?: string;
      jpnSearchText?: string;
      jpnHtmlText?: string;
      opName?: string;
      pcIconHtml?: string;
      evoIconHtml?: string;
    };
  };
}

export interface operations {
  getFileByGameId: {
    parameters: {
      query: {
        game_id: number;
        fname?: string;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["File"][];
        };
      };
    };
  };
  getCharacters_1: {
    parameters: {
      query: {
        chr: string;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["GameCharacter"][];
        };
      };
    };
  };
  getCharacterDetails: {
    parameters: {
      query: {
        page_number?: number;
        page_size?: number;
        sort?: "eng_chr_name" | "jpn_chr_name" | "rows";
        asc?: boolean;
        game_id?: number;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["GameCharacter"][];
        };
      };
    };
  };
  getCharacterDetailsStats: {
    parameters: {
      query: {
        game_id?: number;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["Stat"];
        };
      };
    };
  };
  getGames: {
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["Game"][];
        };
      };
    };
  };
  getDetail: {
    parameters: {
      path: {
        gameId: number;
        fname: string;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["Script"][];
        };
      };
    };
  };
  count: {
    parameters: {
      query: {
        q?: string;
        "chr[]"?: string[];
        game_id?: number;
        strict_search?: boolean;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["Stat"][];
        };
      };
    };
  };
  search: {
    parameters: {
      query: {
        q?: string;
        "chr[]"?: string[];
        game_id?: number;
        strict_search?: boolean;
        page_number?: number;
        page_size?: number;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["Script"][];
        };
      };
    };
  };
}

export interface external {}
