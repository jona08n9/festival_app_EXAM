"use client";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

export default function Product({ data }) {
  const ticket = data.response;
  const [control, setControl] = useState(false);
  const [ticketData, setTicketData] = useState(data.response);

  let ticketHolderFirstName, ticketHolderLastName, ticketType, ticketPhone, ticketEmail, ticketAdress, ticketZip, ticketID, ticketArea, ticketSpots, foofestTents2, foofestTents3, privateTents2, privateTents3, greenCamp, setUp;
  // localStorage.removeItem("sb-zwhuiiextumxbglllmlk-auth-token");

  useEffect(() => {
    localStorage.removeItem("sb-zwhuiiextumxbglllmlk-auth-token");
  }, []);

  // useEffect(() => {
  //   setTicketData([
  //     {
  //       area: "Svartheim",
  //       buyTimeout: 1687282110351,
  //       campSetUp: true,
  //       contactInformation: [
  //         {
  //           email: "jonas@joans",
  //           firstName: "Jonas",
  //           lastName: "M",
  //           phoneNumber: "31 38 21 03",
  //           streetAdress: "hhyl2",
  //           zipCode: "1212",
  //         },
  //         {
  //           email: "jonas@joans",
  //           firstName: "john",
  //           lastName: "mogens",
  //           phoneNumber: "31 38 21 03",
  //           streetAdress: "hhyl2",
  //           zipCode: "1212",
  //         },
  //         {
  //           email: "jonas@joans",
  //           firstName: "Erik",
  //           lastName: "Eriksen",
  //           phoneNumber: "31 38 21 03",
  //           streetAdress: "hhyl2",
  //           zipCode: "1212",
  //         },
  //       ],
  //       created_at: "2023-06-20T17:24:45.347321+00:00",
  //       foofestTents: [{ threePersonTent: 0 }, { twoPersonTent: 2 }],
  //       greenCamp: false,
  //       id: 5,
  //       oneTentForEach: true,
  //       phone: 31382103,
  //       privateTents: [{ threePersonTentPrivat: 0 }, { twoPersonTentPrivat: 0 }],
  //       reservation_id: "9k8q1m36lj4k0x4d",
  //       spotAmount: 2,
  //       ticketAmount: 2,
  //       ticketType: "vip",
  //       totalPrice: 3595,
  //     },
  //   ]);
  //   setControl(true);
  // }, []);

  if (ticket.length > 0) {
    console.log("im in?");
    // Name of first input
    ticketHolderFirstName = `${ticket[0].contactInformation[0].firstName}`;
    ticketHolderLastName = `${ticket[0].contactInformation[0].lastName}`;
    //Number of ticket buyer (first input)
    ticketPhone = `${ticket[0].phone}`;
    //email of ticket buyer (first input)
    ticketEmail = `${ticket[0].contactInformation[0].email}`;
    //Adress of ticket buyer (first input)
    ticketAdress = `${ticket[0].contactInformation[0].streetAdress}`;
    //Zipcode of ticket buyer (first input)
    ticketZip = `${ticket[0].contactInformation[0].zipCode}`;
    //ID of ticket
    ticketID = `${ticket[0].reservation_id}`;
    // Regular or VIP Ticket
    ticketType = `${ticket[0].ticketType}`;
    // Festival Area
    ticketArea = `${ticket[0].area}`;
    // Amount of Spots bought
    ticketSpots = `${ticket[0].spotAmount}`;
    // FOOFEST TENTS --> Bought by us
    foofestTents2 = `${Number(ticket[0].foofestTents.twoPersonTent)}`;
    foofestTents3 = `${Number(ticket[0].foofestTents.threePersonTent)}`;
    // // PRIVATE TENTS --> Brought themself
    privateTents2 = `${Number(ticket[0].privateTents.twoPersonTentPrivat)}`;
    privateTents3 = `${Number(ticket[0].privateTents.threePersonTentPrivat)}`;
    // CAMP SETUP --> We setting up the camp
    setUp = ticket[0].campSetUp;
    // GREEN CAMP --> YES OR NO?
    greenCamp = ticket[0].greenCamp;

    if (Object.keys(ticket[0].contactInformation).length > 1) {
      let contactArray = [];
      for (let i = 1; i <= Object.keys(ticket[0].contactInformation).length - 1; i++) {
        console.log("what", ticket[0].contactInformation[i]);
      }

      console.log("length", Object.keys(ticket[0].contactInformation).length);
      console.log("typeof", typeof ticket[0].contactInformation);
    }
    // const addContactDetails = ticket[0].contactInformation.filter((user) => user.firstName !== ticketHolderFirstName && user.lastName !== ticketHolderLastName);
    // console.log("ACD", addContactDetails);
    console.log("p2", privateTents3);
  }

  console.log("ticket.contactInformation", ticket[0].contactInformation);
  console.log("data", data);
  console.log("data.response", data.response);

  return (
    <>
      {ticket.length > 0 ? (
        <>
          <div className="ticketContainer1 relative">
            <small className="absolute top-3 left-8">Booking Number: {ticketID}</small>
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
                {greenCamp === true ? (
                  <>
                    <p className="ticketDetails_text text-color-black">Green Camp</p> <small className="place-self-end self-center text-right">Enjoy a CO2 compensated Festival!</small>
                  </>
                ) : (
                  ""
                )}
                {setUp === true ? (
                  <>
                    <p className="ticketDetails_text text-color-black">Camp set up</p> <small className="place-self-end self-center text-right">We already set up your camp. Hear where at the information desk.</small>
                  </>
                ) : (
                  ""
                )}
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
          {/* {addContactDetails.length > 1 ? (
            <>
              <div className="ticketContainer2">
                <h3 className="text-color-black text-left mb-2">Additional guests</h3>
              </div>
              {addContactDetails.map((guest) => (
                <div key={uuidv4()} className=" p-2 ticketGuest">
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
                  <h4 className="mb-2">FooFest guest: </h4>
                  <h3 className="text-color-black">
                    {guest.firstName} {guest.lastName}
                  </h3>
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
          )} */}
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

  const res = await fetch("https://jonas-festival-app.vercel.app/api/supabase-get-single-ticket?id=" + ticket);

  if (res.status != 200) {
    return {
      notFound: true,
    };
  }

  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

// export async function getServerSideProps(context) {
//   const ticket = context.params.ticket;
//   console.log(ticket);

//   const res = await fetch(`https://jonas-festival-app.vercel.app/api/supabase-get-single-ticket?reservation_id=${ticket}`);
//   const data = await res.json();

//   // Pass the post data as props to the page
//   return {
//     props: {
//       data,
//     },
//   };
// }
