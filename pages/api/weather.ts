// pages/api/weather.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const apiKey = process.env.OPENWEATHERMAP_API_KEY;
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { q, lat, lon } = req.query;

  if (!apiKey) {
    res.status(500).json({ error: 'API key not set' });
    return;
  }

  if (!q && (!lat || !lon)) {
    res
      .status(400)
      .json({ error: 'Please provide either city or coordinates.' });
    return;
  }

  try {
    const query = q ? `q=${q}` : `lat=${lat}&lon=${lon}`;
    const response = await fetch(
      `${apiUrl}?${query}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    res.status(200).json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res
        .status(500)
        .json({
          error: error || 'Server error while trying to fetch weather data',
        });
    }
  }
}
