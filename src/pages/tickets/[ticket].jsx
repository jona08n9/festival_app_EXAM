import { useState } from "react";

export default function Product({ ticket }) {
  const [id, setId] = useState(ticket);

  return (
    <>
      <h1>Text</h1>
      <p className="text-color-white">{id}</p>
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
