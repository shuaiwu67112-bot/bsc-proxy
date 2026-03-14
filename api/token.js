export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { ca } = req.query;
  if (!ca) return res.status(400).json({ error: '缺少 ca 参数' });

  try {
    const url = `https://api.geckoterminal.com/api/v2/networks/bsc/tokens/${ca}?include=top_pools`;
    const r = await fetch(url, {
      headers: { 'Accept': 'application/json;version=20230302' }
    });
    if (!r.ok) throw new Error(`GeckoTerminal 返回 ${r.status}`);
    const data = await r.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
