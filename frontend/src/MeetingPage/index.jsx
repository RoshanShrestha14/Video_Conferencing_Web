import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";

import MainContent from "./MainContent";
import ControlsBar from "./ControlsBar";
import styles from "./Room.module.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useSocket } from "../context/socketContext";

function Room() {
  const socket = useSocket();
  const { meetingCode } = useParams();
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [userId, setuserId] = useState();
  const [loading, setLoading] = useState(true);


useEffect(() => {
  const verifyCookie = async () => {
    try {
      const { data } = await axios.post("http://localhost:3002/auth/check", {}, { withCredentials: true });

      if (data.success) {
        setUsername(data.user);
        setuserId(data.userId);
      } else {
        removeCookie("token");
        navigate("/login");
      }
    } catch (err) {
      removeCookie("token");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  verifyCookie();
}, []);

  useEffect(() => {

  
    if (!socket) return;
    socket.emit("join-meeting", meetingCode);

     socket.on("user-joined", (data) => {
      console.log("User joined:", data);
    });
  }, [socket]);
  

if (loading) return <p>Loading...</p>;

return (
  <div className={styles.roomContainer}>
    <Header code={meetingCode} userName={username} />
    <MainContent userName={username} pUserId={userId} />
    <ControlsBar />
  </div>
);

}

export default Room;
