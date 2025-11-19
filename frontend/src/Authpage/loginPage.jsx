import React, { useState } from "react";
import styles from "./SignupPage.module.css";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import axios from "axios";

function LoginPage() {
  const [formData, setFormData] = useState({
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

    try {
      let res = await axios.post("http://localhost:3002/auth/login", {
        userName: formData.username,
        password: formData.password,
      });
      setMessage(res.data.message);
      

      setFormData({
        username: "",
        password: "",
      });
    } catch (err) {
      console.error("Error:", err);
        const backendMessage = err.response?.data?.message || "Login failed";
      setMessage(backendMessage); 
      
    }
    console.log("Response:", message);
  };


  return (
    <>
      <div className={styles.container}>
        <div className={styles.incontainer}>
          <div className={styles.signupBox}>
            <h1 className="text-center text-[1.7rem] font-bold mt-4 text-[#0d294f]">
              Welcome Back!
            </h1>

            <div className={styles.joiner}>
              <span>
                {" "}
                <ContactEmergencyIcon />
              </span>{" "}
              &nbsp;&nbsp;
              <span>
                <p>login to join the community!</p>
              </span>
            </div>

            <form className={styles.formBox} onSubmit={handleSubmit}>
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

              <button type="submit" className={styles.submitBtn}>
                Login In
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
