// Hands the page the JavaScript API key (public by design; protect it with an
// HTTP Referer restriction in the Yandex cabinet) and whether office search is set up.

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'public, s-maxage=300');
  res.status(200).json({
    jsKey: process.env.YANDEX_JS_KEY || '',
    search: Boolean(process.env.YANDEX_SEARCH_KEY)
  });
}
