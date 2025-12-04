import React, { useState, useEffect } from "react";
import styles from "./SignupPage.module.css";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import API from "../api/api";


function SignupPage() {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post(
        "/auth/signup",
        {
          fullName: formData.fullName,
          userName: formData.username,
          password: formData.password,
        },
        { withCredentials: true }
      );
      if (res.data.success) {
        setTimeout(() => {
          navigate("/home");
        }, 500);
      }
      setMessage(res.data.message);

      setFormData({
        fullName: "",
        username: "",
        password: "",
      });
    } catch (err) {
      console.error("Error:", err);
      const backendMessage = err.response?.data?.message || "Login failed";
      setMessage(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.nav}>
          <div>
            <Link to="/signup" className={styles.navLink}>
              Register
            </Link>
          </div>
          <div>
            <Link to="/login" className={styles.navLink}>
              log In
            </Link>
          </div>
        </div>
        <div className={styles.incontainer}>
          <div className={styles.signupBox}>
            <h1 className="text-center text-[1.7rem] font-bold mt-4 text-[#0d294f]">
              Let's Get Started
            </h1>

            <div className={styles.joiner}>
              <span>
                {" "}
                <ContactEmergencyIcon />
              </span>{" "}
              &nbsp;&nbsp;
              <span>
                <p>Create an account to join the community!</p>
              </span>
            </div>

            <form className={styles.formBox} onSubmit={handleSubmit}>
              {" "}
              {/* Changed onClick to onSubmit */}
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className={styles.inputField}
              />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className={styles.inputField}
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className={styles.inputField}
              />
              {message && <div style={{color:"#f45e5eff",
                fontSize:"1.2rem"
              }}> <strong>{message}</strong></div>}
              <button
                type="submit"
                disabled={loading}
                className={styles.submitBtn}
              >
                {loading ? "Signing up…" : "sign up "}
              </button>
            </form>
            <div className={styles.joiner}>
              <span>
                <p>Already have an account?</p>
              </span>{" "}
              &nbsp;
              <span>
                <p>
                  <Link to="/login" className="font-bold">
                    Login here
                  </Link>
                </p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupPage;
