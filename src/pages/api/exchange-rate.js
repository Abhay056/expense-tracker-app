export default async function handler(req, res) {
  const { base = 'USD' } = req.query;
  const apiKey = process.env.EXCHANGE_RATE_API_KEY;

  if (!apiKey || apiKey.includes('your_exchange_rate_api_key')) {
    return res.status(500).json({ error: 'Exchange rate API key is not configured.' });
  }

  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${base}`);
    const data = await response.json();

    if (data['result'] === 'error') {
      return res.status(500).json({ error: data['error-type'] });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch exchange rates.' });
  }
}