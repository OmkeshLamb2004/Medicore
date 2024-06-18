/* eslint-disable default-case */
import React, { useRef, useState, useEffect } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { auth, db } from "./base";
import { doc, setDoc } from "firebase/firestore";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updateProfile,
  signOut,
} from "firebase/auth";
import { useAuth } from "./context/auth/AuthState";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import PhoneNumber from "./PhoneNumber";
import "./css/auth.css";
import TextField from "@mui/material/TextField";

const LoginSignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const [phnostatus, setphnostatus] = useState({ msg: "", type: "success" });
  const [fullname, setfullname] = useState("");
  const [phno, setphno] = useState({ phone: "91", valid: false });
  const [loginstate, setloginstate] = useState(false);
  const [imageurl, setimageurl] = useState();
  console.log(currentUser);

  useEffect(() => {
    if (currentUser) {
      setloginstate(true);
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      if (!phno.phone) {
        setphno({ phone: currentUser.phoneNumber, valid: false });
      }
      if (!fullname) {
        setfullname(currentUser.displayName);
      }
      // ...
    } else {
      // User is signed out
      // ...
      console.log("signed out detected");
      setloginstate(false);
    }
  }, [currentUser]);

  const handleChangeFullname = (event) => {
    const value = event.target.value;
    setfullname(value);
  };

  const handleChangePhno = (value) => {
    setphno(value);
    setotpreq(false);
    setphnostatus({ msg: "", type: "success" });
  };

  const handleNameSubmit = (e) => {
    // console.log(e.target[0].value);
    e.preventDefault();
    // return
    if (!fullname) {
      alert("Enter your name");
      return;
    }
    updateProfile(currentUser, {
      displayName: fullname,
    })
      .then(async () => {
        // Profile updated!
        // ...
        // await setDoc(
        //   doc(db, "users", currentUser.uid),
        //   {
        //     phoneNumber: phno.phone,
        //     displayName: fullname,
        //     uid: currentUser.uid,
        //     photoURL: imageurl,
        //   },
        //   { merge: true }
        // );
        // await setDoc(doc(db, "userChats", currentUser.uid), {});
        navigate("/patient", { replace: true });
        // console.log("profile updates");
      })
      .catch((error) => {
        // An error occurred
        // ...
        console.log(error);
      });
  };

  function handlesignout() {
    console.log("nothing");
    if (currentUser) {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
        })
        .catch((error) => {
          // An error happened.
        });
    }
  }

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      auth
    );
  };
  // console.log(phno.phone.slice(0, 3));
  const [otp, setotp] = useState("");
  const [otpreq, setotpreq] = useState(false);
  function requestOTP(e) {
    e.preventDefault();
    setphnostatus({ msg: "Verifying phone number", type: "info" });
    if (phno.valid) {
      setphnostatus({ msg: "OTP  is being sent...", type: "info" });
      try {
        if (!window.recaptchaVerifier) {
          generateRecaptcha();
        }
      } catch (err) {
        console.log("Error caught");
        setphnostatus({
          msg: "Error occured: " + err.code,
          type: "error",
        });
      }
      if (window.recaptchaVerifier) {
        let appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, phno.phone, appVerifier)
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            setphnostatus({
              msg: "OTP is sent. Please Check you messages.",
              type: "info",
            });
            setotpreq(true);
          })
          .catch((error) => {
            setphnostatus({
              msg: error,
              type: "error",
            });
            console.log(error);
          });
      }
    } else {
      setphnostatus({ msg: "Phone Number in wrong format", type: "error" });
    }
  }

  const verifyOTP = (e) => {
    let otp = e.target.value;
    setotp(otp);

    if (otp.length === 6 && phno.valid) {
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then((result) => {
          // User signed in successfully.
          console.log(otp, " verified");
          const currentUser = result.user;
          console.log(currentUser);
          setotpreq(false);
          setphnostatus({ msg: "OTP verified successfully!", type: "success" });
          setTimeout(() => {
            setphnostatus({ msg: "", type: "success" });
          }, 10000);
          // ...
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
          console.log(otp, "wrong verified");
          setphnostatus({
            msg: "Wrong OTP verified! Please check the OTP  recived by the given phone number",
            type: "error",
          });
        });
    }
  };
  return (
    <div className="home-agenda section-container">
      {/* <!--? Slider Area Start--> */}
      <div className="slider-area slider-area2">
        <div className="slider-active dot-style">
          {/* <!-- Slider Single --> */}
          <div className="single-slider  d-flex align-items-center slider-height2">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-xl-7 col-lg-8 col-md-10 ">
                  <div className="hero-wrapper">
                    <div className="hero__caption">
                      <h1 data-animation="fadeInUp" data-delay=".3s">
                        Log In
                      </h1>
                      <p data-animation="fadeInUp" data-delay=".6s">
                        Almost before we knew it, we
                        <br /> had left the ground
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Slider Area End --> */}
      {/* <!--?  Contact Area start  --> */}
      <section className="contact-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="contact-title">Log In</h2>
            </div>
            <div className="col-lg-8">
              <div className="auth-body-right">
                <div style={{ width: "100%" }}>
                  <form className="auth-form form-contact contact_form">
                    <div className="field">
                      <label htmlFor="phno">
                        Phone Number<span className="required-star">*</span>
                      </label>
                      <br />
                      <div className="col-12">
                        <div className="form-group">
                          <PhoneNumber
                            value={phno}
                            setValue={handleChangePhno}
                            inputProps={{
                              disabled: loginstate,
                              name: "phno",
                              required: true,
                            }}
                          />
                        </div>
                      </div>
                      {/* <input
                        type="text"
                        onChange={(e) => {
                          handleChangePhno(e);
                          setotpreq(false);
                          setphnostatus({ msg: "", type: "success" });
                        }}
                        disabled={loginstate}
                        value={phno.phone}
                        name="phno"
                        id="phno"
                        placeholder="Phone Number (+91...)"
                        required
                      /> */}
                      {!otpreq && !loginstate && (
                        <div className="form-group mt-3">
                          <button
                            type="button"
                            // id="otpbutton"
                            onClick={requestOTP}
                            className="button button-contactForm boxed-btn"
                          >
                            Request OTP
                          </button>
                        </div>
                      )}
                      {otpreq && (
                        <div className="col-sm-6">
                          <div className="form-group">
                            <input
                              type="number"
                              value={otp}
                              onChange={verifyOTP}
                              placeholder="Enter OTP"
                              // className="otpinput"
                              className="form-control valid"
                            />
                          </div>
                        </div>
                      )}
                      {phnostatus.msg && (
                        <div className="col-12">
                          <div className="form-group">
                            <Alert
                              variant="filled"
                              severity={phnostatus.type}
                              style={{ fontSize: "small" }}
                            >
                              {phnostatus.msg}
                            </Alert>
                          </div>
                        </div>
                      )}
                    </div>
                    <div id="recaptcha-container"></div>
                    {Boolean(currentUser) ? (
                      currentUser.displayName ? (
                        <Navigate to="/patient" state={{ from: location }} replace />
                      ) : (
                        <div className="field" id="namediv">
                          <br />
                          <div className="col-sm-6">
                            <div className="form-group">
                              <input
                                id="standard-basic"
                                type="text"
                                maxLength="30"
                                name="fullname"
                                onChange={handleChangeFullname}
                                value={fullname}
                                // id="fullname"
                                placeholder="Full Name..."
                                autoFocus
                                required
                                label="Full Name"
                                variant="standard"
                                className="form-control valid"
                                onfocus="this.placeholder = ''"
                                onblur="this.placeholder = 'Enter your name'"
                              />
                            </div>
                          </div>
                          <br />
                          {/* <input
                            type="text"
                            maxLength="30"
                            name="fullname"
                            onChange={handleChangeFullname}
                            value={fullname}
                            id="fullname"
                            placeholder="Full Name..."
                            autoFocus
                            required
                          /> */}
                          <div className="form-group mt-3">
                            <button
                              // className="submit-btn"
                              onClick={handleNameSubmit}
                              className="button button-contactForm boxed-btn"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      )
                    ) : (
                      <></>
                    )}
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-3 offset-lg-1">
              <div className="media contact-info">
                <span className="contact-info__icon">
                  <i className="ti-home"></i>
                </span>
                <div className="media-body">
                  <h3>Buttonwood, California.</h3>
                  <p>Rosemead, CA 91770</p>
                </div>
              </div>
              <div className="media contact-info">
                <span className="contact-info__icon">
                  <i className="ti-tablet"></i>
                </span>
                <div className="media-body">
                  <h3>+1 253 565 2365</h3>
                  <p>Mon to Fri 9am to 6pm</p>
                </div>
              </div>
              <div className="media contact-info">
                <span className="contact-info__icon">
                  <i className="ti-email"></i>
                </span>
                <div className="media-body">
                  <h3>support@colorlib.com</h3>
                  <p>Send us your query anytime!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Contact Area End --> */}
      {/* <!--? About Law Start--> */}
      <section className="about-low-area mt-60">
        <div className="container">
          <div className="about-cap-wrapper">
            <div className="row">
              <div className="col-xl-5  col-lg-6 col-md-10 offset-xl-1">
                <div className="about-caption mb-50">
                  {/* <!-- Section Tittle --> */}
                  <div className="section-tittle mb-35">
                    <h2>100% satisfaction guaranteed.</h2>
                  </div>
                  <p>Almost before we knew it, we had left the ground</p>
                  <a href="about.html" className="border-btn">
                    Make an Appointment
                  </a>
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                {/* <!-- about-img --> */}
                <div className="about-img">
                  <div className="about-font-img">
                    <img src="assets/img/gallery/about2.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- About Law End--> */}
    </div>
  );
};

export default LoginSignUp;
