# Fonts

Served from here so a build never contacts Google Fonts. Both families are under the SIL Open Font License; see the OFL files in this folder.

Built from [google/fonts](https://github.com/google/fonts/tree/5bb28733cec313b63fbd415b574b5ae35c8aa8b8/ofl) with fontTools, as variable woff2 with all layout features kept:

| File | Source | Axes | Characters |
| --- | --- | --- | --- |
| `SchibstedGrotesk-wght.woff2` | `SchibstedGrotesk[wght].ttf` | wght 400 to 900 | Latin, Latin Extended |
| `Newsreader-wght.woff2` | `Newsreader[opsz,wght].ttf` | opsz pinned to 16, wght 500 to 600 | Latin, Latin Extended, Vietnamese |
| `Newsreader-Italic-wght.woff2` | `Newsreader-Italic[opsz,wght].ttf` | opsz pinned to 16, wght 400 to 500 | Latin |

Newsreader's optical size is pinned to 16, not its file default of 18, because that is what Google Fonts serves when no size is requested.
