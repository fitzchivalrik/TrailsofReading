import { writable } from "svelte/store";

const CURRENT_LEVEL = "currentLevel"
const LINE = "line";
const AUDIO_SETTING = "audioSetting";
const ORDER_SETTING = "orderSetting"

export const lineReset = writable(false);

export const line = writable(localStorage.getItem(LINE) ?? 0);
line.subscribe((v) => {
    console.debug(`Saving ${v} as ${LINE}`);
    localStorage.setItem(LINE, v.toString())
});

export const currentLevel = writable(localStorage.getItem(CURRENT_LEVEL) ?? "0000");
currentLevel.subscribe((v) => {
    console.debug(`Saving ${v} as ${CURRENT_LEVEL}`);
    localStorage.setItem(CURRENT_LEVEL, v)
});

export const audioSetting = writable(localStorage.getItem(AUDIO_SETTING) ?? "audioOnly");
audioSetting.subscribe((v) => {
    console.debug(`Saving ${v} as ${AUDIO_SETTING}`);
    localStorage.setItem(AUDIO_SETTING, v)
});

export const orderSetting = writable(localStorage.getItem(ORDER_SETTING) ?? "kklc");
orderSetting.subscribe((v) => {
    console.debug(`Saving ${v} as ${ORDER_SETTING}`);
    localStorage.setItem(ORDER_SETTING, v)
});
