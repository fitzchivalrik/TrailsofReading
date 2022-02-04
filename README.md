# Trails of Reading WIP

Kanji reading exercises taken from the Trails series.
Click [here](#TODO) for the deployed PWA.
Intended as additional reading exercises when learning Kanji with
[KKLC](https://keystojapanese.com/how-to-study/).  
Wanikani etc. ordering is TODO.  

**BEWARE**: As those lines are straight outta the games they are **_full of spoilers_**.
Do not read if you are not up to date.  
Settings to exclude games (and a certain door) might come at a later date.
Vote on the corresponding issue if you would like to see such a feature.

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

TODO

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
The actual textline (more precise, the script file which contains the textline)
is fetched directly from
[Trails in the Database](https://trailsinthedatabase.com) by each
user of the PWA individually and then cached.

TODO: Precache? The whole script files are about 340MB.

### Attribution

Favicon and logo by KanjiVG. KanjiVG is copyright © 2009-2018 Ulrich Apel
and released under the Creative Commons Attribution-Share Alike 3.0 license.

`Kanji_all_frequence_sorted` data by 
[Migaku Kanji Addon](https://github.com/migaku-official/Migaku-Kanji-Addon).