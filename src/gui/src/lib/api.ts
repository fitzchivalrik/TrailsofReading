import { gunzipSync, strFromU8 } from "fflate";

export async function uncompressJsonFetch<T>(url: string) {
    try {
        const buffer = new Uint8Array(await (await fetch(url)).arrayBuffer());
        const s = strFromU8(gunzipSync(buffer));
        return JSON.parse(s) as T;
    } catch (e) {
        console.error(e);
        return null;
    }
}