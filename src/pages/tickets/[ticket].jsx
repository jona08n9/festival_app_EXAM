import { useState, useEffect } from "react";

export default function Product({ ticket }) {
  const [id, setId] = useState(ticket);
  const [ticketData, setTicketData] = useState();

  useEffect(() => {
    fetch(`https://zwhuiiextumxbglllmlk.supabase.co/rest/v1/jonas_foofest?reservation_id=eq.${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3aHVpaWV4dHVteGJnbGxsbWxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY3NDQzMjEsImV4cCI6MjAwMjMyMDMyMX0.6bVHqcHAjW1yayID2eKPB5jiFxbx4Pk5bQ2Dvb-PXLo",
        // apikey: SUPABASE_KEY,
        Prefer: "return=representation",
      },
    })
      .then((res) => res.json())
      .then((data) => setTicketData(data));

    localStorage.removeItem("sb-zwhuiiextumxbglllmlk-auth-token");
  });

  return (
    <>
      <h1>Text</h1>
      <p className="text-color-white">{id}</p>
      <button onClick={() => console.log(ticketData)}>See data</button>
    </>
  );
}

export async function getServerSideProps(context) {
  const ticket = context.params.ticket;
  console.log(ticket);

  //   Fetch post data from API using the ID parameter

  //   const [res1] = await Promise.all([fetch(`${apiUrl}/bands/${band}`), fetch(`${apiUrl}/schedule`)]);

  //   const bandData = await res1.json();
  //   const scheduleData = await res2.json();

  //   // Pass the post data as props to the page
  return {
    props: {
      ticket,
    },
  };
}
