"use client";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";

export default function Product({ ticket }) {
  const [id, setId] = useState(ticket);
  const [control, setControl] = useState(false);
  const [ticketData, setTicketData] = useState("NO VALUE");

  let ticketHolderName, ticketType, ticketPhone, ticketArea, ticketSpots, addContactDetails;

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

    setControl(true);
  }, []);

  if (control === true) {
    console.log("im in?");
    ticketHolderName = `${ticketData[0].contactInformation[0].firstName} ${ticketData[0].contactInformation[0].lastName}`;
    ticketType = `${ticketData[0].ticketType}`;
    ticketPhone = `${ticketData[0].phone}`;
    ticketArea = `${ticketData[0].area}`;
    ticketSpots = `${ticketData[0].spotAmount}`;
    addContactDetails = ticketData[0].contactInformation;
    console.log(addContactDetails);
  }

  console.log("ticketData", ticketData);
  return (
    <>
      {control === true ? (
        <>
          <div className="ticketContainer">
            <h4 className="text-color-black text-center">Ticket Holder</h4>
            <h3 className="text-color-black text-center">{ticketHolderName}</h3>
            <div className="ticketDetails_container my-2 border-t-2 p-2">
              <div className="ticketDetails">
                <p className="ticketDetails_header text-color-black">Ticket Type</p>
                <p className="ticketDetails_text text-color-black">{ticketType.toUpperCase()}</p>
              </div>
              <div className="ticketDetails">
                <p className="ticketDetails_header text-color-black">Area</p>
                <p className="ticketDetails_text text-color-black">{ticketArea.toUpperCase()}</p>
              </div>
              <div className="ticketDetails">
                <p className="ticketDetails_header text-color-black">No. of spots</p>
                <p className="ticketDetails_text text-color-black">{ticketSpots.toUpperCase()}</p>
              </div>
            </div>
            <div className="personalInfo my-2 border-t-2 p-2">
              <div className="ticketDetails">
                <p className="ticketDetails_header text-color-black">Phone number</p>
                <p className="ticketDetails_text text-color-black">+45 {ticketPhone.toUpperCase()} </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <h2>Getting your ticket</h2>
          <CircularProgress sx={{ color: "yellow" }} className="mx-auto" />
        </>
      )}
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
