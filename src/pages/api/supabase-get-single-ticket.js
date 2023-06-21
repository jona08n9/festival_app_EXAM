export default async function handler(req, res) {
  console.log(req.query);
  const response = await fetch(`https://zwhuiiextumxbglllmlk.supabase.co/rest/v1/jonas_foofest?reservation_id=eq.${req.query.id}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      // apikey: process.env.SUPABASE_KEY,
      apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3aHVpaWV4dHVteGJnbGxsbWxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY3NDQzMjEsImV4cCI6MjAwMjMyMDMyMX0.6bVHqcHAjW1yayID2eKPB5jiFxbx4Pk5bQ2Dvb-PXLo",
      Prefer: "return=representation",
    },
  }).then((res) => res.json());

  return res.status(200).json({ response });
}
