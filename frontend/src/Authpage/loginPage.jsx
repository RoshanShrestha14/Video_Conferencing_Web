import React, { useState } from "react";
import styles from "./SignupPage.module.css";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    try {
      let res = await axios.post(
        "http://localhost:3002/auth/login",
        {
          userName: formData.username,
          password: formData.password,
        },
        { withCredentials: true }
      );
      if (res.data.success) {
        setTimeout(() => {
          navigate("/home");
        },300);
      } else {
        setMessage(res.data.message || "Login failed");
      }

      setMessage(res.data.message);

      setFormData({
        username: "",
        password: "",
      });
    } catch (err) {
      console.error("Error:", err);
      const backendMessage = err.response?.data?.message || "Login failed";
      setMessage(backendMessage);
      console.log(message);
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
               {message && <div style={{color:"#f45e5eff",
                fontSize:"1.2rem"
              }}> <strong>{message}</strong></div>}

              <button
                type="submit"
                disabled={loading}
                className={styles.submitBtn}
              >
                {loading ? "Logging in…" : "Log In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
