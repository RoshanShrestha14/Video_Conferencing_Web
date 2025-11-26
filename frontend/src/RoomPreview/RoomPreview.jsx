import React, { useRef, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./RoomPreview.module.css";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import { useMedia } from "../context/MediaProvider";

function RoomPreview() {
  const {
    localStream,
    setLocalStream,
    isVideoOn,
    isAudioOn,
    toggleVideo,
    toggleAudio,
  } = useMedia();
  const { meetingCode } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null)
  const localStreamRef = useRef();

  useEffect(() => {
    const getPreview = async () => {
      try {
        const userMediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setLocalStream(userMediaStream);
        localStreamRef.current =userMediaStream;
        
      } catch (err) {
        console.log("Error accessing mic and video:", err);
        alert("Please allow your both video and audio permissions");
      }
    };

    getPreview();

  
  }, []);

  useEffect(()=>{
    if (videoRef.current) {
          videoRef.current.srcObject = localStream;
          videoRef.current.play().catch((err) => {
            console.error("Error playing video:", err);
          });
        }


  },localStream)

  const handleJoinMeeting = () => {
    navigate(`/home/${meetingCode}`);
  };

  return (
    <div className={styles.previewContainer}>
      <h2>Meeting Code: {meetingCode}</h2>

      <div className={styles.previewVideo}>
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className={styles.video}
          style={{ display: isVideoOn ? "block" : "none" }}
        />

        {!isVideoOn && (
          <div className={styles.avatarPreview}>
            <div className={styles.avatar}>
              <NoAccountsIcon sx={{ fontSize: "5rem" }} />
            </div>
          </div>
        )}
      </div>

      <div className={styles.controls}>
        <button onClick={toggleVideo} className={styles.controlButton}>
          {isVideoOn ? (
            <div>
              <VideocamIcon /> Camera ON
            </div>
          ) : (
            <div>
              <VideocamOffIcon /> Camera off
            </div>
          )}
        </button>

        <button onClick={toggleAudio} className={styles.controlButton}>
          {isAudioOn ? (
            <div>
              <MicIcon /> Mic on
            </div>
          ) : (
            <div>
              <MicOffIcon /> Mic off
            </div>
          )}
        </button>

        <button onClick={handleJoinMeeting} className={styles.joinButton}>
          Join Meeting
        </button>
      </div>
    </div>
  );
}

export default RoomPreview;
