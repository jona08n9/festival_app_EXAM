export default function Product({ ticket }) {
  return <h1>Text</h1>;
}

export async function getServerSideProps(context) {
  const ticket = context.params.ticket;
  console.log(ticket);

  //   Fetch post data from API using the ID parameter

  //   const [res1] = await Promise.all([fetch(`${apiUrl}/bands/${band}`), fetch(`${apiUrl}/schedule`)]);

  //   const bandData = await res1.json();
  //   const scheduleData = await res2.json();

  //   // Pass the post data as props to the page
  //   return {
  //     props: {
  //       bandData,
  //       scheduleData,
  //     },
  //   };
}
