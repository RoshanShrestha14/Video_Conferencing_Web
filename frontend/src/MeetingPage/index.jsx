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

  useEffect(() => {
    const verifyCookie = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:3002/auth/check",
          {},
          { withCredentials: true }
        );
        const { success, user } = data;
        if (success) {
          setUsername(user);
        } else {
          removeCookie("token");
          navigate("/login");
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        removeCookie("token");
        navigate("/login");
      }
    };

    verifyCookie();
  }, [navigate, removeCookie]);

  useEffect(() => {
    if (!socket) return;
    socket.emit("join-meeting", meetingCode);

    socket.on("user-joined", (data) => {
      console.log("User joined:", data);
      setuserId(data.userId);
      console.log(userId)
    });
  }, [socket]);
  

  return (
    <div className={styles.roomContainer}>
      <Header code={meetingCode} userName={username} />
      <MainContent userName={username} userId = {userId} />
      <ControlsBar />
    </div>
  );
}

export default Room;
