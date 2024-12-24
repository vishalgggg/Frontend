import { useState } from "react";
import { RxComponent1 } from "react-icons/rx";
import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAction } from "../../store/actions/authActions";
import { forgotpwdAction } from "../../store/actions/authActions";

const Authentication = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const [onForgotPwd, setOnForgotPwd] = useState(false);

  /* -------------------------------------------------------------------------- */
  /*                           SWITCH LOGIN OR SIGN UP                          */
  /* -------------------------------------------------------------------------- */
  const setIsloggedInHandeler = () => {
    setLoggedIn((prev) => {
      return !prev;
    });
    setOnForgotPwd(false);
  };

  /* -------------------------------------------------------------------------- */
  /*                           USER LOG IN AND SIGN UP                          */
  /* -------------------------------------------------------------------------- */

  const submitedFormHandeler = async (e) => {
    e.preventDefault();
    const signupInfo = {
      userName,
      userEmail,
      userPhone,
      userPwd,
    };
    try {
      /* -------------------------------------------------------------------------- */
      /*                          FOR CREATING NEW ACCOUNT                          */
      /* -------------------------------------------------------------------------- */

      if (!loggedIn && !onForgotPwd) {
        const { data } = await axios.post("http://localhost:4000/auth/signup", signupInfo);

        // storing the token into local storage
        if (data) {
          localStorage.setItem("token", data.token);
          dispatch(loginAction());
          navigate("/expenses");
        }
      }

      /* -------------------------------------------------------------------------- */
      /*                                 FOR LOG IN                                 */
      /* -------------------------------------------------------------------------- */

      if (loggedIn && !onForgotPwd) {
        const loginInfo = {
          userEmail,
          userPwd,
        };

        const { data } = await axios.post("http://localhost:4000/auth/login", loginInfo);

        // storing the token into local storage
        if (data) {
          localStorage.setItem("token", data.token);
          dispatch(loginAction());
          navigate("/expenses");
        }
      }

      /* -------------------------------------------------------------------------- */
      /*                             FOR FORGOT PASSWORD                            */
      /* -------------------------------------------------------------------------- */

      if (onForgotPwd) {
        if (userEmail) {
          dispatch(forgotpwdAction(userEmail));
        }
      }
    } catch (error) {
      console.log(error);
    }
    setUserEmail("");
    setUserPwd("");
    setUserName("");
    setUserPhone("");
  };

  return (
    <form className=" font-popins" onSubmit={submitedFormHandeler}>
      <div className="flex items-center justify-start gap-2 cursor-pointer">
        <h1
          className=" text-4xl pl-10 py-8 mt-4 font-semibold  "
          onClick={() => {
            location.reload();
          }}
        >
          BudgetBuddy
        </h1>
        <RxComponent1 className="text-3xl" />
      </div>
      <div className=" m-auto  mt-10 lg:w-[70rem] w-full">
        <div className=" p-7 flex flex-col gap-3">
          <h1 className="text-5xl font-semibold">
            {!loggedIn
              ? "Create Account"
              : onForgotPwd
              ? "Forgot Password"
              : "Log In"}
          </h1>

          <div className="mt-7 flex flex-col gap-2">
            {!loggedIn && (
              <div className=" flex flex-col ">
                <label htmlFor="email">Name</label>
                <input
                  type="text"
                  placeholder="Enter Your Name..."
                  className="bg-[#e0e0e0] p-2 rounded-md"
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                  value={userName}
                  required
                />
              </div>
            )}

            <div className=" flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter Your E-mail..."
                className="bg-[#e0e0e0] p-2 rounded-md"
                onChange={(e) => {
                  setUserEmail(e.target.value);
                }}
                value={userEmail}
                required
              />
            </div>

            {!loggedIn && (
              <div className=" flex flex-col">
                <label htmlFor="email">Phone</label>
                <input
                  type="number"
                  placeholder="Enter Your Phone Number..."
                  className="bg-[#e0e0e0] p-2 rounded-md"
                  onChange={(e) => {
                    setUserPhone(e.target.value);
                  }}
                  value={userPhone}
                  required
                />
              </div>
            )}

            {!onForgotPwd && (
              <div className=" flex flex-col">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="Enter Your Password..."
                  className={`bg-[#e0e0e0] p-2 rounded-md `}
                  onChange={(e) => {
                    setUserPwd(e.target.value);
                  }}
                  value={userPwd}
                  required
                />
              </div>
            )}
            <div>
              {loggedIn && (
                <p
                  className=" text-red-600 text-sm cursor-pointer w-fit"
                  onClick={() => {
                    setOnForgotPwd(true);
                  }}
                >
                  {!onForgotPwd && "Forgot Password"}
                </p>
              )}
            </div>

            <div className=" mt-5">
              <button
                type="submit"
                className=" py-2 px-10 bg-[#1877f2] font-semibold text-white rounded-md"
              >
                {!loggedIn
                  ? "Create Account"
                  : onForgotPwd
                  ? "Forgot Passowrd"
                  : "Log In"}
              </button>
            </div>

            <div className=" mt-5 w-fit">
              <h1>{!loggedIn ? "Already have an account?" : "New User?"}</h1>
              <h1
                onClick={setIsloggedInHandeler}
                className="text-[#1877f2] text-lg font-medium cursor-pointer font-sans"
              >
                {!loggedIn ? "Log In" : "Create New Account"}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Authentication;
