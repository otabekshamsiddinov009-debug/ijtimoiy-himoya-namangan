// Searches Yandex's organization database (Places API) for "Inson" social services centres
// in Namangan region. Runs on Vercel so the search key never reaches the browser.
// The CDN caches a successful answer for 24 hours, so Yandex is queried about once a day.

const BBOX = '70.50,40.50~72.30,41.60'; // Namangan region, lon,lat~lon,lat
const QUERIES = [
  'Inson ijtimoiy xizmatlar markazi',
  'Инсон ижтимоий хизматлар маркази',
  'Центр социальных услуг Инсон',
  'Inson markazi',
  'Ijtimoiy himoya',
  'Ижтимоий ҳимоя'
];

async function search(key, text) {
  const params = new URLSearchParams({
    apikey: key, text, lang: 'uz_UZ', type: 'biz', bbox: BBOX, rspn: '1', results: '50'
  });
  const res = await fetch('https://search-maps.yandex.ru/v1/?' + params.toString());
  if (!res.ok) {
    let message = '';
    try { message = (await res.json()).message || ''; } catch {}
    const err = new Error(message);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

export default async function handler(req, res) {
  const key = process.env.YANDEX_SEARCH_KEY;
  if (!key) {
    res.setHeader('Cache-Control', 'no-store');
    res.status(503).json({ error: 'nokey' });
    return;
  }

  const results = await Promise.allSettled(QUERIES.map(q => search(key, q)));
  const ok = results.filter(r => r.status === 'fulfilled').map(r => r.value);

  if (!ok.length) {
    const reason = results[0].reason || {};
    res.setHeader('Cache-Control', 'no-store');
    res.status(502).json({ error: 'upstream', status: reason.status || 0, message: reason.message || '' });
    return;
  }

  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
  res.status(200).json({
    fetchedAt: Date.now(),
    features: ok.flatMap(d => (d && d.features) || [])
  });
}
