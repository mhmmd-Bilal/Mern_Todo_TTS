import React, { useEffect } from "react";
import "./LoginPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../slices/userApiSlice";
import { toast } from "react-toastify";
import { useDispatch,useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";

function LoginPage() {

  const {userData} = useSelector((state) => state.auth)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let res = await loginUser({ email, password }).unwrap();
      await dispatch(setCredentials({...res.data}))
      toast.success("Login Succcess");
      navigate("/");
    } catch (error) {
      console.log(error?.message || error?.data?.message);
      toast.error(error?.message || error?.data?.message);
    }
  };

  useEffect(()=>{
    if(userData){
      navigate('/')
    }
  },[])

  return (
    <>
      <div>
        <div className="login-container">
          <div className="login-card">
            <h2>Login</h2>

            <form onSubmit={submitHandler}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button type="submit">
                {isLoading ? "We are Checking.." : "Login"}
              </button>
            </form>

            <p className="login-footer">
              Don’t have an account? <Link to="/register">Create one</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
