# Ijtimoiy himoya — Namangan

Map of social protection (Ijtimoiy himoya) offices in Namangan region. Office locations, phones and hours come from Yandex's organization database; the map is Yandex Maps JavaScript API 2.1.

## Vercel settings

Add these under **Project → Settings → Environment Variables**, then redeploy:

| Name | Value |
| --- | --- |
| `YANDEX_JS_KEY` | Key for **JavaScript API** (shows the map) |
| `YANDEX_SEARCH_KEY` | Key for **API Поиска по организациям** (finds the offices) |

Keys come from https://developer.tech.yandex.ru. In the JavaScript API key's **HTTP Referer** restriction, add the site's domain (for example `ijtimoiy-himoya-namangan.vercel.app`). Leave the search key without a Referer restriction: it is used only on Vercel's server and never reaches the browser.

## Service locations

The three services (Kunduzgi parvarish, Erta aralashuv, Yangi kun) are listed in `data/services.json`. Each location is one entry in `locations`:

```json
{
  "service": "erta-aralashuv",
  "name": "Chust tumani erta aralashuv xizmati",
  "address": "Namangan viloyati, Chust tumani, Mustaqillik ko'chasi, 12",
  "lat": 40.9974,
  "lon": 71.2151,
  "phones": ["+998 69 000-00-00"],
  "hours": "Du–Ju 9:00–18:00",
  "district": "chust"
}
```

`service` must be one of the service `id`s at the top of the file. `lat`/`lon` are required (copy them from Yandex Maps). `district` is optional; without it the district is read from the address. District ids: `city`, `davlatobod`, `yanginamangan`, `namangantuman`, `chortoq`, `chust`, `kosonsoy`, `mingbuloq`, `norin`, `pop`, `toraqorgon`, `uchqorgon`, `uychi`, `yangiqorgon`. A service's `description` (one sentence) is shown in the details panel when it is filled in.

## Hiding a Yandex entry

To keep a centre found on Yandex off the map, add its name and address (exactly as the site shows them) to `data/hidden.json`:

```json
{ "offices": [ { "name": "Namangan shahri Inson Ijtimoiy xizmatlar markazi", "address": "Namangan, Xurriyat koʻchasi, 66" } ] }
```

## How it works

- `index.html` — the page.
- `api/config.js` — gives the page the JavaScript API key.
- `api/offices.js` — searches Yandex for the offices. Vercel's CDN caches the answer for 24 hours, so Yandex is queried about once a day no matter how many people visit.
