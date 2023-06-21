"use client";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";

export default function Product({ ticket }) {
  const [id, setId] = useState(ticket);
  const [control, setControl] = useState(false);
  const [ticketData, setTicketData] = useState("NO VALUE");

  let ticketHolderFirstName, ticketHolderLastName, ticketType, ticketPhone, ticketEmail, ticketAdress, ticketZip, ticketArea, ticketSpots, addContactDetails, foofestTents2, foofestTents3, privateTents2, privateTents3, greenCamp, setUp;

  useEffect(() => {
    // fetch(`https://zwhuiiextumxbglllmlk.supabase.co/rest/v1/jonas_foofest?reservation_id=eq.${id}`, {
    //   method: "GET",
    //   headers: {
    //     "content-type": "application/json",
    //     apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3aHVpaWV4dHVteGJnbGxsbWxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY3NDQzMjEsImV4cCI6MjAwMjMyMDMyMX0.6bVHqcHAjW1yayID2eKPB5jiFxbx4Pk5bQ2Dvb-PXLo",
    //     // apikey: SUPABASE_KEY,
    //     Prefer: "return=representation",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => setTicketData(data));

    // localStorage.removeItem("sb-zwhuiiextumxbglllmlk-auth-token");
    setTicketData([
      {
        area: "Svartheim",
        buyTimeout: 1687282110351,
        campSetUp: true,
        contactInformation: [
          {
            email: "jonas@joans",
            firstName: "Jonas",
            lastName: "M",
            phoneNumber: "31 38 21 03",
            streetAdress: "hhyl2",
            zipCode: "1212",
          },
          {
            email: "jonas@joans",
            firstName: "john",
            lastName: "mogens",
            phoneNumber: "31 38 21 03",
            streetAdress: "hhyl2",
            zipCode: "1212",
          },
          {
            email: "jonas@joans",
            firstName: "Erik",
            lastName: "Eriksen",
            phoneNumber: "31 38 21 03",
            streetAdress: "hhyl2",
            zipCode: "1212",
          },
        ],
        created_at: "2023-06-20T17:24:45.347321+00:00",
        foofestTents: [{ threePersonTent: 0 }, { twoPersonTent: 2 }],
        greenCamp: false,
        id: 5,
        oneTentForEach: true,
        phone: 31382103,
        privateTents: [{ threePersonTentPrivat: 0 }, { twoPersonTentPrivat: 0 }],
        reservation_id: "9k8q1m36lj4k0x4d",
        spotAmount: 2,
        ticketAmount: 2,
        ticketType: "vip",
        totalPrice: 3595,
      },
    ]);
    setControl(true);
  }, []);

  if (control === true) {
    console.log("im in?");
    // Name of first input
    ticketHolderFirstName = `${ticketData[0].contactInformation[0].firstName}`;
    ticketHolderLastName = `${ticketData[0].contactInformation[0].lastName}`;
    //Number of ticket buyer (first input)
    ticketPhone = `${ticketData[0].phone}`;
    //email of ticket buyer (first input)
    ticketEmail = `${ticketData[0].contactInformation[0].email}`;
    //Adress of ticket buyer (first input)
    ticketAdress = `${ticketData[0].contactInformation[0].streetAdress}`;
    //Zipcode of ticket buyer (first input)
    ticketZip = `${ticketData[0].contactInformation[0].zipCode}`;
    // Regular or VIP Ticket
    ticketType = `${ticketData[0].ticketType}`;
    // Festival Area
    ticketArea = `${ticketData[0].area}`;
    // Amount of Spots bought
    ticketSpots = `${ticketData[0].spotAmount}`;
    // FOOFEST TENTS --> Bought by us
    foofestTents2 = `${Number(ticketData[0].foofestTents[1].twoPersonTent)}`;
    foofestTents3 = `${Number(ticketData[0].foofestTents[0].threePersonTent)}`;
    // PRIVATE TENTS --> Brought themself
    privateTents2 = `${Number(ticketData[0].privateTents[1].twoPersonTentPrivat)}`;
    privateTents3 = `${Number(ticketData[0].privateTents[0].threePersonTentPrivat)}`;
    // CAMP SETUP --> We setting up the camp
    setUp = ticketData[0].campSetUp;
    // GREEN CAMP --> YES OR NO?
    greenCamp = ticketData[0].greenCamp;
    addContactDetails = ticketData[0].contactInformation.filter((user) => user.firstName !== ticketHolderFirstName && user.lastName !== ticketHolderLastName);
    console.log("ACD", addContactDetails);
    console.log("p2", privateTents3);
  }

  console.log("ticketData", ticketData);
  return (
    <>
      {control === true && ticketData !== "NO VALUE" ? (
        <>
          <div className="ticketContainer1 relative">
            <small className="absolute top-3 left-8">Booking Number: {ticket}</small>
            <h4 className="text-color-black text-center mb-2">Ticket Holder</h4>
            <h3 className="text-color-black text-center mb-4">
              {ticketHolderFirstName} {ticketHolderLastName}
            </h3>
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
              {foofestTents2 > 0 || foofestTents3 > 0 ? (
                <div className="ticketDetails">
                  <p className="ticketDetails_header text-color-black">Tents Brought from home</p>
                  {foofestTents2 > 0 ? <p className="ticketDetails_text text-color-black">Two person tents: {foofestTents2}</p> : ""}
                  {foofestTents3 > 0 ? <p className="ticketDetails_text text-color-black">Three person tents: {foofestTents3}</p> : ""}
                </div>
              ) : (
                ""
              )}
              {privateTents2 > 0 || privateTents3 > 0 ? (
                <>
                  <div className="ticketDetails">
                    <p className="ticketDetails_header text-color-black">FooFest Tents</p>
                    {privateTents2 > 0 ? <p className="ticketDetails_text text-color-black">Two person tents: {privateTents2}</p> : ""}
                    {privateTents3 > 0 ? <p className="ticketDetails_text text-color-black">Three person tents: {privateTents3}</p> : ""}
                    <small className="block text-xs">Notice: </small>
                    <small className="block text-xs">Pick up your tents at the information booth</small>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
            <div className="ticketDetails p-2">
              <p className="ticketDetails_header text-color-black">Extras</p>
              <div className="extraDetails">
                {
                  (greenCamp = true ? (
                    <>
                      <p className="ticketDetails_text text-color-black">Green Camp</p> <small className="place-self-end self-center text-right">Enjoy a CO2 compensated Festival!</small>
                    </>
                  ) : (
                    ""
                  ))
                }
                {
                  (setUp = true ? (
                    <>
                      <p className="ticketDetails_text text-color-black">Camp set up</p> <small className="place-self-end self-center text-right">We already set up your camp. Hear where at the information desk.</small>
                    </>
                  ) : (
                    ""
                  ))
                }
              </div>
            </div>

            <div className="my-2 border-t-2 p-2">
              <h4 className="mb-2">Personal information</h4>
              <div className="personalInfo">
                <div className="ticketDetails">
                  <p className="ticketDetails_header text-color-black">Phone number</p>
                  <p className="ticketDetails_text text-color-black">+45 {ticketPhone.toUpperCase()} </p>
                </div>
                <div className="ticketDetails">
                  <p className="ticketDetails_header text-color-black">Email</p>
                  <p className="ticketDetails_text text-color-black">{ticketEmail} </p>
                </div>
                <div className="ticketDetails">
                  <p className="ticketDetails_header text-color-black">TicketAdress</p>
                  <p className="ticketDetails_text text-color-black">{ticketAdress} </p>
                </div>
                <div className="ticketDetails">
                  <p className="ticketDetails_header text-color-black">Zip code</p>
                  <p className="ticketDetails_text text-color-black">{ticketZip} </p>
                </div>
              </div>
            </div>
          </div>
          {addContactDetails.length > 1 ? (
            <>
              <div className="ticketContainer2">
                <h3 className="text-color-black text-left mb-2">Additional guests</h3>
              </div>
              {addContactDetails.map((guest) => (
                <div className=" p-2 ticketGuest">
                  <div className="holes">
                    <span className="hole"></span>
                    <span className="hole"></span>
                    <span className="hole"></span>
                    <span className="hole"></span>
                    <span className="hole"></span>
                    <span className="hole"></span>
                    <span className="hole"></span>
                    <span className="hole"></span>
                    <span className="hole"></span>
                    <span className="hole"></span>
                    <span className="hole"></span>
                    <span className="hole"></span>
                    <span className="hole"></span>
                    <span className="hole"></span>
                    <span className="hole"></span>
                    <span className="hole"></span>
                    <span className="hole"></span>
                    <span className="hole"></span>
                    <span className="hole"></span>
                    <span className="hole"></span>
                    <span className="hole"></span>
                    <span className="hole"></span>
                    <span className="hole"></span>
                    <span className="hole"></span>
                    <span className="hole"></span>
                    <span className="hole"></span>
                    <span className="hole"></span>
                    <span className="hole"></span>
                    <span className="hole"></span>
                    <span className="hole"></span>
                    <span className="hole"></span>
                    <span className="hole"></span>
                    <span className="hole"></span>
                    <span className="hole"></span>
                    <span className="hole"></span>
                  </div>
                  <h4 className="mb-2">
                    FooFest guest:{" "}
                    <h3 className="text-color-black">
                      {guest.firstName} {guest.lastName}
                    </h3>
                  </h4>
                  <small className="absolute top-3 right-8">Booking Number: {ticket}</small>
                  <div className="personalInfo">
                    <div className="ticketDetails">
                      <p className="ticketDetails_header text-color-black">Phone number</p>
                      <p className="ticketDetails_text text-color-black">+45 {guest.phoneNumber} </p>
                    </div>
                    <div className="ticketDetails">
                      <p className="ticketDetails_header text-color-black">Email</p>
                      <p className="ticketDetails_text text-color-black">{guest.email} </p>
                    </div>
                    <div className="ticketDetails">
                      <p className="ticketDetails_header text-color-black">TicketAdress</p>
                      <p className="ticketDetails_text text-color-black">{guest.streetAdress} </p>
                    </div>
                    <div className="ticketDetails">
                      <p className="ticketDetails_header text-color-black">Zip code</p>
                      <p className="ticketDetails_text text-color-black">{guest.zipCode} </p>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            ""
          )}
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
