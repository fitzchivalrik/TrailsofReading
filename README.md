# Trails of Reading WIP

Kanji reading exercises taken from the Trails series.
Click [here](https://fitzchivalrik.github.io/TrailsofReading/) for the deployed PWA.
Intended as additional reading exercises when learning Kanji with
[KKLC](https://keystojapanese.com/how-to-study/).  
Other ordering (Wanikani etc.) is even more untested.  

**BEWARE**: As those lines are straight outta the games they are **_full of spoilers_**.
Do not read if you are not up to date.  

A few notes:

- Here and there there are debug and/or junk and/or less helpful lines. As long as it's Japanese, 
  it's still practice, right? One can always skip lines, too.
- Reverie has no localisation and as such no English text.  
- Not always was there a line containing a particular kanji as the highest one,
  so not all 'levels' have entries.  
- Up to three kanji _not_ in KKLC/WK etc. are allowed per line and are not
  taken into consideration when determining the level of the line.
  However, if there are **only** kanji not contained in the current course (KKLC, WK, ...)
  then the level is automatically the highest.  
  I am not really happy with that solution, but I am unsure where else to put them.
  Level 0 is reserved for lines containing no kanji whatsoever.
- The above also means, that there are some interesting lines tucked away
  in the highest level (e.g. 2301 for KKLC). I recommend checking them out!

## PWA Keyboard Shortcuts

- **SPACE**: Switch between Japanese/English
- **Arrow Right**: Next line in level
- **Arrow Left**: Previous line in level
- **Arrow Up**: Previous level
- **Arrow Down**: Next level
- **Z**: Play Audio 1, if available
- **X**: Play Audio 2, if available
- **C**: Play Audio 3, if available
- **V**: Play Audio 4, if available

## Developer Notes

`src/main.ts` is a [deno](https://deno.land)
program to get the each game's script files from
[Trails in the Database](https://trailsinthedatabase.com).
It then applies some transformations and arrives at JSONs containing
metadata to get reading lines in order of
[KKLC](https://keystojapanese.com)
(and WaniKani TODO).

Those JSONs are the primary input consumed by the PWA in `src/gui`,
built with [svelte](https://svelte.dev).

### Attribution

Favicon and logo by KanjiVG. KanjiVG is copyright © 2009-2018 Ulrich Apel
and released under the Creative Commons Attribution-Share Alike 3.0 license.

`Kanji_all_frequence_sorted` data by 
[Migaku Kanji Addon](https://github.com/migaku-official/Migaku-Kanji-Addon).

Original scripts containing the lines from [Trails in the Database](https://trailsinthedatabase.com).
