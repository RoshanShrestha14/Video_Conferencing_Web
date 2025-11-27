import React, { useEffect, useRef, useState } from "react";
import styles from "./Room.module.css";
import MicOffIcon from "@mui/icons-material/MicOff";
import { useMedia } from "../context/MediaProvider";
import { useSocket } from "../context/socketContext";
import SimplePeer from "simple-peer";

function VideoSection({ username, userId }) {
  const { localStream, isVideoOn, isAudioOn } = useMedia();
  const socket = useSocket();

  const [participants, setParticipants] = useState([]);
  const videoRefs = useRef({});
  const peersRef = useRef();

  const createPeerConnection = (otherSocketId, initiator, offerData = null) => {
    const peer = new SimplePeer({
      initiator: initiator,
      stream: localStream,
      trickle: true,
    });

    peer.on("signal", (data) => {
      if (data.type === "offer") {
        socket.emit("webrtc-offer", {
          to: otherSocketId,
          offer: data,
        });
      } else if (data.type === "answer") {
        socket.emit("webrtc-answer", {
          to: otherSocketId,
          answer: data,
        });
      } else {
        socket.emit("ice-candidate", {
          to: otherSocketId,
          candidate: data,
        });
      }
    });

    peer.on("stream", (remoteStream) => {
      addRemoteVideo(otherSocketId, remoteStream);
    });

    peersRef.current[otherSocketId] = peer;

    return peer;
  };

  useEffect(() => {
    socket.on("user-joined", ({ userId, userName }) => {
      console.log(
        console.log(`socket id is ${userId} , socket userName is ${userName}`)
      );
      createPeerConnection(userId, true);
    });

    socket.on("webrtc-offer", (data) => {
      createPeerConnection(data.from, false, data.offer);
    });

    socket.on("webrtc-answer", (data) => {
      if (peersRef.current[data.from]) {
        peersRef.current(data.from).signal(data.answer);
      }
    });

    socket.on("ice-candidate", (data) => {
      if (peersRef.current[data.from]) {
        peersRef.current[data.from].signal(data.candidate);
      }
    });
  }, [localStream]);

  useEffect(() => {
    if (userId && username && localStream) {
      const newParticipant = {
        id: userId,
        name: username,
        isVideoOn: isVideoOn,
        isAudioOn: isAudioOn,
      };
      setParticipants([newParticipant]);
    }
  }, [userId, username, localStream, isVideoOn, isAudioOn]);

  useEffect(() => {
    if (localStream && participants.length > 0) {
      const videoEl = videoRefs.current[userId];
      if (videoEl) {
        videoEl.srcObject = localStream;
        videoEl.play().catch((err) => {
          console.error("Error playing video:", err);
        });
      }
    }
  }, [localStream, participants]);

  const setVideoRef = (element, participantId) => {
    if (element) {
      videoRefs.current[participantId] = element;
    }
  };

  return (
    <div className={styles.videoSection}>
      <div className={styles.videoGrid}>
        {participants.map((participant) => (
          <div key={participant.id} className={styles.videoTile}>
            <div className={styles.videoPlaceholder}>
              {participant.isVideoOn ? (
                <div className={styles.videoStream}>
                  <video
                    ref={(el) => setVideoRef(el, participant.id)}
                    autoPlay
                    muted
                    playsInline
                    className={styles.videoElement}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      backgroundColor: "#000",
                    }}
                  />
                  <div className={styles.videoOverlay}>
                    <span className={styles.participantName}>
                      {participant.name}
                    </span>
                    {!participant.isAudioOn && (
                      <span className={styles.mutedIndicator}>
                        <MicOffIcon />
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className={styles.avatarPlaceholder}>
                  <div className={styles.avatar}>
                    {participant.name ? participant.name.charAt(0) : "?"}
                  </div>
                  <span className={styles.participantName}>
                    {participant.name}
                  </span>
                  {!participant.isAudioOn && (
                    <span className={styles.mutedIndicator}>
                      <MicOffIcon />
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoSection;
