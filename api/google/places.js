export default async function handler(req, res) {
  const { placeId } = req.query;

  if (!placeId) {
    return res.status(400).json({ error: "Missing placeId" });
  }

  const url =
    `https://places.googleapis.com/v1/places/${placeId}`;

  const googleRes = await fetch(url,
    {
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': process.env.GOOGLE_PLACES_KEY,
        'X-Goog-FieldMask': 'id,displayName,rating,userRatingCount,reviews'
      }
    }
  );

  const data = await googleRes.json();

  return res.status(200).json(data);
}

