export default async function handler(req, res) {
  console.log(req);
  //   const response = await fetch(`https://zwhuiiextumxbglllmlk.supabase.co/rest/v1/jonas_foofest?phone=eq.${req.query.phone}`, {
  const response = await fetch(`https://zwhuiiextumxbglllmlk.supabase.co/rest/v1/jonas_foofest?phone=eq.12121212`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      apikey: process.env.SUPABASE_KEY,
      Prefer: "return=representation",
    },
  }).then((res) => res.json());

  return res.status(200).json({ response });
}
