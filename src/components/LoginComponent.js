import { useState, useEffect, useRef } from "react";
import { TextField, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";

export default function LoginComponent() {
  const [userNumber, setUserNumber] = useState();
  const [userId, setUserId] = useState();
  const [renderState, setRenderState] = useState("INITIAL_STATE");
  const [correctData, setCorrectData] = useState();
  const [dataResponse, setDataResponse] = useState(undefined);
  const [inputArray, setInputArray] = useState([undefined, undefined, undefined, undefined, undefined, undefined]);
  const [userToken, setUserToken] = useState("");
  const [secondsCounter, setSecondsCounter] = useState(null);
  const router = useRouter();
  const inputRefs = useRef([]);
  const MAX_INPUTS = 6;
  const SUPABASE_KEY = process.env.SUPABASE_KEY;

  const supabase = createClient("https://zwhuiiextumxbglllmlk.supabase.co/", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3aHVpaWV4dHVteGJnbGxsbWxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY3NDQzMjEsImV4cCI6MjAwMjMyMDMyMX0.6bVHqcHAjW1yayID2eKPB5jiFxbx4Pk5bQ2Dvb-PXLo");

  useEffect(() => {
    if (userToken === "") {
      if (dataResponse === undefined) {
        console.log("Initial state", dataResponse);
      } else if (dataResponse.length === 0) {
        console.log("Wrong Number", dataResponse);
        setRenderState("WRONG_PHONENUMBER");
      } else if (dataResponse.length > 0) {
        console.log("Correct Number", dataResponse);
        setRenderState("CORRECT_PHONENUMBER");
        setUserId(dataResponse[0].reservation_id);
        setSecondsCounter(60);
        signIn();
      }
    } else {
      if (userToken === "ERROR") {
        setRenderState("WRONG_TOKEN");
      } else if (userToken === "TIMEOUT") {
        setRenderState("TIMEOUT");
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      } else {
        console.log("SENDING DATA", dataResponse);
        setRenderState("FETCHING_TOKEN_ID");
        verifySignIn();
      }
    }
  }, [dataResponse, userToken]);

  useEffect(() => {
    // secondsCounter > 0 && setTimeout(() => setSecondsCounter(secondsCounter - 1), 1000);
    if (secondsCounter > 0) {
      const timer = setTimeout(() => {
        setSecondsCounter(secondsCounter - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (secondsCounter === 0) {
      setUserToken("TIMEOUT");
    }
  }, [secondsCounter]);

  const signIn = async () => {
    let { data, error } = await supabase.auth.signInWithOtp({
      phone: `+45${userNumber.toString()}`,
    });
  };

  const verifySignIn = async () => {
    let { session, error } = await supabase.auth.verifyOtp({
      phone: `+45${userNumber.toString()}`,
      token: `${userToken.toString()}`,
      type: "sms",
    });

    if (error) {
      console.log("error", error);
      setUserToken("ERROR");
    } else {
      console.log(session);
      router.push(`/tickets/${userId}`);
    }

    // console.log(session);
    // console.log(error);
    // } catch (error) {
    //   alert(error);
    //   setUserToken("");
    //   setRenderState("WRONG_TOKEN");
    // }
    // alert("OK");
    // router.push(`/tickets/${userId}`);
  };

  const checkValidity = (e) => {
    e.preventDefault();
    console.log(e.target.phone.value);
    setUserNumber(e.target.phone.value);
    checkSupaBase(e.target.phone.value);
  };

  function checkSupaBase(number) {
    fetch(`https://zwhuiiextumxbglllmlk.supabase.co/rest/v1/jonas_foofest?phone=eq.${number}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3aHVpaWV4dHVteGJnbGxsbWxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY3NDQzMjEsImV4cCI6MjAwMjMyMDMyMX0.6bVHqcHAjW1yayID2eKPB5jiFxbx4Pk5bQ2Dvb-PXLo",
        // apikey: SUPABASE_KEY,
        Prefer: "return=representation",
      },
    })
      .then((res) => res.json())
      .then((data) => setDataResponse(data));
    // setDataResponse(data));
    // .then((data) => console.log(data));
  }
  const handleInputChange = (event) => {
    const value = event.target.value;
    console.log(value);

    if (value.length > 5) {
      setUserToken(value);
      console.log("userToken", userToken);
      checkOTPInput();
    }
  };

  function checkOTPInput() {
    console.log("userToken", userToken);
  }

  return (
    <>
      <section className="mt-12 flex flex-col justify-center">
        <h3 className="text-center max-w-2xl mx-auto">If you've bought a ticket for FooFest, you'll recieve a One Time Password to login and see your booking information.</h3>
        {renderState === "INITIAL_STATE" ? (
          <article>
            <h4 className="text-color-yellow max-w-lg mx-auto text-center my-7">Input your phone number</h4>
            <form className="flex flex-col justify-center" onSubmit={checkValidity}>
              <TextField
                inputProps={{ inputMode: "tel" }}
                className="mx-auto"
                name="phone"
                label="Your phone number"
                sx={{
                  "& label.Mui-focused": {
                    color: "yellow",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "yellow",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#B2BAC2",
                    },
                    "& .MuiOutlinedInput-input": {
                      borderColor: "none",
                    },
                    "& .MuiOutlinedInput-input:focus": {
                      border: "2px solid transparent",
                    },
                    "&:hover fieldset": {
                      borderColor: "#B2BAC2",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "yellow",
                    },
                  },
                }}
              />
              <Button type="submit" className=" mt-8 place-self-center mb-10 h-10 gap-5 rounded-none border-2 border-solid border-color-yellow px-6 font-sans font-semibold text-color-yellow hover:bg-color-yellow hover:text-color-black ">
                Log In
              </Button>
            </form>
          </article>
        ) : (
          ""
        )}
        {renderState === "WRONG_PHONENUMBER" ? (
          <>
            <article>
              <h4 className="text-color-red max-w-md mx-auto text-center my-7">ERROR! The you've send was not in our database. Please try again with the correct number</h4>
              <form className="flex flex-col justify-center" onSubmit={checkValidity}>
                <TextField
                  inputProps={{ inputMode: "tel" }}
                  className="mx-auto"
                  name="phone"
                  label="Your phone number"
                  sx={{
                    "& label.Mui-focused": {
                      color: "yellow",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "yellow",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#B2BAC2",
                      },
                      "& .MuiOutlinedInput-input": {
                        borderColor: "none",
                      },
                      "& .MuiOutlinedInput-input:focus": {
                        border: "2px solid transparent",
                      },
                      "&:hover fieldset": {
                        borderColor: "#B2BAC2",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "yellow",
                      },
                    },
                  }}
                />
                <Button type="submit" className=" mt-8 place-self-center mb-10 h-10 gap-5 rounded-none border-2 border-solid border-color-yellow px-6 font-sans font-semibold text-color-yellow hover:bg-color-yellow hover:text-color-black ">
                  Log In
                </Button>
              </form>
            </article>
          </>
        ) : (
          ""
        )}
        {renderState === "CORRECT_PHONENUMBER" ? (
          <>
            <article>
              <h4 className="text-color-yellow max-w-lg mx-auto text-center my-7">{`We've send you a six digit code to the phone number +45 ${userNumber.substring(0, 4)} - ${userNumber.substring(4, 8)}. Please fill them in below to log in.`}</h4>
              {secondsCounter === 0 ? <h4 className="text-color-yellow max-w-lg mx-auto text-center my-7">Your timer has run out, the page will reload in 5 seconds. Please try again.</h4> : <h4 className="text-color-yellow max-w-lg mx-auto text-center my-7">You have {secondsCounter} seconds to input your OTP code</h4>}
              <form className="flex flex-row justify-center max-w-lg mx-auto gap-4" onSubmit={checkValidity}>
                <TextField
                  inputProps={{ inputMode: "number", maxLength: 6 }}
                  className="mx-auto flex justify-center align-middle text-center"
                  sx={{
                    "& label.Mui-focused": {
                      color: "yellow",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "yellow",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#B2BAC2",
                      },
                      "& .MuiOutlinedInput-input": {
                        borderColor: "none",
                      },
                      "& .MuiOutlinedInput-input:focus": {
                        border: "2px solid transparent",
                      },
                      "&:hover fieldset": {
                        borderColor: "#B2BAC2",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "yellow",
                      },
                    },
                  }}
                  onChange={(event) => handleInputChange(event)}
                />
              </form>
            </article>
          </>
        ) : (
          ""
        )}
        {renderState === "FETCHING_TOKEN_ID" ? (
          <>
            <article className="flex flex-col mx-auto gap-3 justify-center">
              <h4 className="text-color-yellow max-w-lg mx-auto text-center my-7">Running verification, please wait</h4>
              <CircularProgress sx={{ color: "yellow" }} className="mx-auto" />
            </article>
          </>
        ) : (
          ""
        )}
        {renderState === "WRONG_TOKEN" ? (
          <>
            <article>
              <h4 className="text-color-red max-w-lg mx-auto text-center my-7">The code is wring. Please try again.</h4>
              {secondsCounter === 0 ? <h4 className="text-color-yellow max-w-lg mx-auto text-center my-7">Your timer has run out, the page will reload in 5 seconds. Please try again.</h4> : <h4 className="text-color-yellow max-w-lg mx-auto text-center my-7">You have {secondsCounter} seconds to input your OTP code</h4>}
              <form className="flex flex-row justify-center max-w-lg mx-auto gap-4" onSubmit={checkValidity}>
                <TextField
                  inputProps={{ inputMode: "number", maxLength: 6 }}
                  className="mx-auto flex justify-center align-middle text-center"
                  sx={{
                    "& label.Mui-focused": {
                      color: "yellow",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "yellow",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#B2BAC2",
                      },
                      "& .MuiOutlinedInput-input": {
                        borderColor: "none",
                      },
                      "& .MuiOutlinedInput-input:focus": {
                        border: "2px solid transparent",
                      },
                      "&:hover fieldset": {
                        borderColor: "#B2BAC2",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "yellow",
                      },
                    },
                  }}
                  onChange={(event) => handleInputChange(event)}
                />
              </form>
            </article>
          </>
        ) : (
          ""
        )}
        {renderState === "TIMEOUT" ? (
          <>
            <article>
              <h4 className="text-color-red max-w-lg mx-auto text-center my-7">Times out - This page wil reset in 5 seconds</h4>
              <form className="flex flex-row justify-center max-w-lg mx-auto gap-4" onSubmit={checkValidity}>
                <TextField
                  disabled
                  inputProps={{ inputMode: "number", maxLength: 6 }}
                  className="invalidMui cursor-not-allowed mx-auto flex justify-center align-middle text-center"
                  sx={{
                    "& label.Mui-focused": {
                      color: "yellow",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "yellow",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#red",
                      },
                      "& .MuiOutlinedInput-input": {
                        borderColor: "none",
                      },
                      "& .MuiOutlinedInput-input:focus": {
                        border: "2px solid transparent",
                      },
                      "&:hover fieldset": {
                        borderColor: "#red",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "yellow",
                      },
                    },
                  }}
                  onChange={(event) => handleInputChange(event)}
                />
              </form>
            </article>
          </>
        ) : (
          ""
        )}
      </section>
    </>
  );
}
