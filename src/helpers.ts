export function unique(
  value: unknown,
  index: number,
  self: unknown[],
): boolean {
  return self.indexOf(value) === index;
}

export function delayBetween(minMs: number, maxMs: number) {
  const delay = Math.random() * (maxMs - minMs) + minMs;
  return new Promise((resolve) => setTimeout(resolve, delay));
}

export function get<T>(path: string, url: string): Promise<T> {
  return Deno.readTextFile(path).then(
    (s) => JSON.parse(s),
    async () => {
      // Throttle API calls a lil'
      await delayBetween(5, 150);
      const res = await fetch(url);
      const body = await res.text();
      await Deno.writeTextFile(path, body);
      return JSON.parse(body);
    },
  );
}

//TODO: This is kinda horrible and needs to be refactored
export async function read<T>(
  path: string,
  creation: () => T,
  space: number | string | undefined,
  forceCreation = false,
): Promise<T> {
  if (forceCreation) {
    const r = creation();
    console.log(`Writing file ${path}...`);
    await Deno.writeTextFile(
      path,
      JSON.stringify(r, null, space),
    );
    return r;
  } else {
    return Deno.readTextFile(path)
      .then(
        (s) => {
          try {
            return JSON.parse(s);
          } catch (e) {
            console.error(`Parsing ${path}`);
            console.error(e);
            Deno.exit(1);
          }
        },
        async () => {
          const r = creation();
          console.log(`Writing file ${path}...`);
          await Deno.writeTextFile(
            path,
            JSON.stringify(r, null, space),
          );
          return r;
        },
      );
  }
}

export function csv2JSON(
  csv: string,
  max_fields: number | null = null,
): string {
  const lines = csv.split(/\n|\r\n/);
  const header = lines.shift()!.split(",");
  type Result = {
    [key: string]: string;
  };

  const r = lines.map((l) => {
    const [t, _dontcare] = [...l].reduce<[string[], boolean]>(
      ([acc, quoted], current) => {
        if (quoted && current === '"') {
          return [acc, false];
        }
        const last = acc.pop()!;
        if (quoted) {
          acc.push(last.concat(current));
          return [acc, true];
        } else if (current === ",") {
          acc.push(last);
          acc.push("");
          return [acc, false];
        } else if (current === '"') {
          acc.push(last);
          return [acc, true];
        } else {
          acc.push(last.concat(current));
          return [acc, false];
        }
      },
      [[""], false],
    );
    const r: Result = {};
    for (let i = 0; i < (max_fields ?? header.length); i++) {
      r[header[i]] = t[i];
    }
    return r;
  });

  return JSON.stringify(r); //JSON
}

// deno-lint-ignore no-explicit-any
export const groupBy = <T, K extends keyof any>(
  list: T[],
  getKey: (item: T) => K,
) => {
  return list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {} as Record<K, T[]>);
};
