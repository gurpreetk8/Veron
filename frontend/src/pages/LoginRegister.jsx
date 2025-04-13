import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import maleAvatar from "../assets/male.jpg";
import femaleAvatar from "../assets/female.jpg";
import "./LoginRegister.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getCookie = (name) => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + "=")) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (formRef.current) {
        formRef.current.classList.add("scroll-unroll");
      }
    }, 50);
    return () => clearTimeout(timeout);
  }, [isLogin]);

  const handleFormSwitch = () => {
    setIsLogin(!isLogin);
    setAgreeTerms(false);
    setFirstName("");
    setLastName("");
    setContact("");
    setPassword("");
    setSelectedProfile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = isLogin
      ? "http://127.0.0.1:8000/users/user_login/"
      : "http://127.0.0.1:8000/users/user_register/";

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    if (!isLogin) {
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("phone_number", contact);
      formData.append("selected_profile", selectedProfile);
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      if (isLogin) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Login successful! Redirecting...");
        window.location.href = "/";
      } else {
        toast.success("Registration successful! Please login.");
        setFirstName("");
        setLastName("");
        setContact("");
        setPassword("");
        setSelectedProfile(null);
        setAgreeTerms(false);
        setIsLogin(true);
      }
    } catch (error) {
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="auth-container">
        <div
          key={isLogin ? "login" : "register"}
          ref={formRef}
          className={`form-box ${!isLogin ? "register-form" : ""}`}
        >
          <h2>{isLogin ? "Login" : "Register"}</h2>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="profile-selection">
                  <div className="profile-options">
                    <img
                      src={maleAvatar}
                      alt="Male Avatar"
                      className={selectedProfile === "male" ? "selected" : ""}
                      onClick={() => setSelectedProfile("male")}
                    />
                    <img
                      src={femaleAvatar}
                      alt="Female Avatar"
                      className={selectedProfile === "female" ? "selected" : ""}
                      onClick={() => setSelectedProfile("female")}
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    placeholder="Enter first name"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    placeholder="Enter last name"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label>Contact</label>
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {isLogin && <p className="forgot-password">Forgot password?</p>}

            {!isLogin && (
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  required
                />
                <label htmlFor="terms">
                  I agree to the terms and conditions
                </label>
              </div>
            )}

            <button
              type="submit"
              className="btn"
              disabled={(!isLogin && !agreeTerms) || loading}
            >
              {loading
                ? isLogin
                  ? "Logging in..."
                  : "Registering..."
                : isLogin
                ? "Login"
                : "Register"}
            </button>
          </form>

          <p className="toggle-form">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span onClick={handleFormSwitch}>
              {isLogin ? "Register" : "Login"}
            </span>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginRegister;
