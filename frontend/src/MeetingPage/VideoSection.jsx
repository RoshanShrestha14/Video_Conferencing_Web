import React, { useEffect, useRef, useState } from "react";
import styles from "./Room.module.css";
import MicOffIcon from "@mui/icons-material/MicOff";
import { useMedia } from "../context/MediaProvider";
import { useSocket } from "../context/socketContext";
import SimplePeer from "simple-peer-light";

function VideoSection({ username, pUserId }) {
  const { localStream, isVideoOn, isAudioOn } = useMedia();
  const socket = useSocket();
  const userInfoMap = useRef({});

  const [participants, setParticipants] = useState([]);
  const videoRefs = useRef({});
  const peersRef = useRef({});
  const remoteStreamsRef = useRef({});

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

    peer.on("stream", ( remoteStream) => {

      const userInfo = userInfoMap.current[otherSocketId];
      const userName = userInfo.userName;
      const userId = userInfo.userId;

      console.log(`username is ${userName}, userid is ${userId}`);
      remoteStreamsRef.current[userId] = remoteStream;
      const hasVideo =
        remoteStream.getVideoTracks().length > 0 &&
        remoteStream.getVideoTracks()[0].enabled;
      const hasAudio =
        remoteStream.getAudioTracks().length > 0 &&
        remoteStream.getAudioTracks()[0].enabled;

      setParticipants((prev) => {
        const existing = prev.find((p) => p.userId === userId);
        if (existing) {
          return prev.map((p) =>
            p.userId === userId
              ? { ...p, isVideoOn: hasVideo, isAudioOn: hasAudio }
              : p
          );
        } else {
          return [
            ...prev,
            {
              userId: userId, 
              name: userName, 
              isVideoOn: hasVideo,
              isAudioOn: hasAudio,
              isLocal: false,
            },
          ];
        }
      });
    });

    peersRef.current[otherSocketId] = peer;
      peer.socketId = otherSocketId;


    if (offerData) {
      peer.signal(offerData);
    }

    return peer;
  };

  useEffect(() => {
    const handleUserJoined = ({ userId, socketId, userName }) => {
      console.log(`User joined: ${userId}, socket: ${socketId}`);
      userInfoMap.current[socketId] = {
        userId: userId,
        userName: userName,
      };
      console.log(`here is the detail  ${userInfoMap.current[socketId].userName}`);

      createPeerConnection(socketId, true);
    };

    const handleWebRTCOffer = (data) => {
      createPeerConnection(data.from, false, data.offer);
    };

    const handleWebRTCAnswer = (data) => {
      if (peersRef.current[data.from]) {
        peersRef.current[data.from].signal(data.answer);
      }
    };

    const handleICECandidate = (data) => {
      if (peersRef.current[data.from]) {
        peersRef.current[data.from].signal(data.candidate);
      }
    };

    socket.on("user-joined", handleUserJoined);
    socket.on("webrtc-offer", handleWebRTCOffer);
    socket.on("webrtc-answer", handleWebRTCAnswer);
    socket.on("ice-candidate", handleICECandidate);

    // Cleanup
    return () => {
      socket.off("user-joined", handleUserJoined);
      socket.off("webrtc-offer", handleWebRTCOffer);
      socket.off("webrtc-answer", handleWebRTCAnswer);
      socket.off("ice-candidate", handleICECandidate);
    };
  }, [localStream, socket, userInfoMap]);

  useEffect(() => {
    if (localStream) {
      setParticipants((prev) => {
        const already = prev.find((p) => p.isLocal === true);
        if (already) return prev;
        return [
          ...prev,
          {
            userId:pUserId,
            name:username,
            isVideoOn: isVideoOn,
              isAudioOn: isAudioOn,
              isLocal: true,
          },
        ];
      });
    }
  }, [localStream,userInfoMap]);

  useEffect(() => {
    participants.forEach((p) => {
      const videoEl = videoRefs.current[p.userId];
      if (videoEl) {
        videoEl.srcObject = p.isLocal
          ? localStream
          : remoteStreamsRef.current[p.userId];
      }
    });
  }, [participants, localStream]);

  const setVideoRef = (element, participantId) => {
    if (element) {
      videoRefs.current[participantId] = element;
    }
  };

  return (
    <div className={styles.videoSection}>
      <div className={styles.videoGrid}>
        {participants.map((participant) => (
          <div key={participant.userId} className={styles.videoTile}>
            <div className={styles.videoPlaceholder}>
              {participant.isVideoOn ? (
                <div className={styles.videoStream}>
                  <video
                    ref={(el) => setVideoRef(el, participant.userId)}
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
                      {participant.name} {participant.isLocal && "(You)"}
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
                    {participant.name} {participant.isLocal && "(You)"}
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
