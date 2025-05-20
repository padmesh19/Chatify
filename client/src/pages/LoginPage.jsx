import React, { useContext, useState } from "react";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const [checkbox, setCheckbox] = useState(false);

  const { login } = useContext(AuthContext);



  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (currState === "Sign up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }
    if (currState === "Sign up" && isDataSubmitted && checkbox===false) {
      toast.error("Please tick the checkbox");
      return;
    }
      login(currState === "Sign up" ? "signup" : "login", {
        fullName,
        email,
        password,
        bio,
      });
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-12 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      <div className="flex flex-col justify-center items-center gap-4">
        <img src={assets.logo_icon} alt="" className="w-[min(30vw,250px)]" />
        <h3 className="text-5xl bg-gradient-to-r from-blue-900 to-violet-700 bg-clip-text text-transparent font-semibold tracking-wide">
          Chatify
        </h3>
      </div>
      <form
        onSubmit={onSubmitHandler}
        className="sm:min-w-[350px] border-2 bg-white text-gray-800 border-gray-100 p-6 flex flex-col gap-6 rounded-xl shadow-lg"
      >
        <h2 className="font-medium text-2xl flex justify-between items-center">
          {currState}
          {isDataSubmitted && (
            <img
              onClick={() => setIsDataSubmitted(false)}
              src={assets.arrow_icon}
              alt=""
              className="w-5 cursor-pointer"
            />
          )}
        </h2>
        {currState === "Sign up" && !isDataSubmitted && (
          <input
            type="text"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Full Name"
            required
          />
        )}
        {!isDataSubmitted && (
          <>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email Address"
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
          </>
        )}
        {currState === "Sign up" && isDataSubmitted && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Provide a short bio..."
          ></textarea>
        )}
        <button className="py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer">
          {currState === "Sign up" ? "Create Account" : "Login Now"}
        </button>
        {currState === "Sign up" && isDataSubmitted && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <input onClick={()=>setCheckbox(!checkbox)} type="checkbox" />
            <p>Agree to the terms of use & privacy policy.</p>
          </div>
        )}
        <div className="flex flex-col gap-2">
          {currState === "Sign up" ? (
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => {
                  setCurrState("Login");
                  setIsDataSubmitted(false);
                }}
                className="font-medium text-violet-500 cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Create an account{" "}
              <span
                onClick={() => {
                  setCurrState("Sign up");
                }}
                className="font-medium text-violet-500 cursor-pointer"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
