# Ijtimoiy himoya — Namangan

Map of social protection (Ijtimoiy himoya) offices in Namangan region. Office locations, phones and hours come from Yandex's organization database; the map is Yandex Maps JavaScript API 2.1.

## Vercel settings

Add these under **Project → Settings → Environment Variables**, then redeploy:

| Name | Value |
| --- | --- |
| `YANDEX_JS_KEY` | Key for **JavaScript API** (shows the map) |
| `YANDEX_SEARCH_KEY` | Key for **API Поиска по организациям** (finds the offices) |

Keys come from https://developer.tech.yandex.ru. In the JavaScript API key's **HTTP Referer** restriction, add the site's domain (for example `ijtimoiy-himoya-namangan.vercel.app`). Leave the search key without a Referer restriction: it is used only on Vercel's server and never reaches the browser.

## How it works

- `index.html` — the page.
- `api/config.js` — gives the page the JavaScript API key.
- `api/offices.js` — searches Yandex for the offices. Vercel's CDN caches the answer for 24 hours, so Yandex is queried about once a day no matter how many people visit.
