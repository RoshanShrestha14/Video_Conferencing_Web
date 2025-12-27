import React, { use, useEffect, useRef, useState } from "react";
import styles from "./Room.module.css";
import { useMedia } from "../context/MediaProvider";
import { useSocket } from "../context/socketContext";
import VideoTile from "./memo/VideoTile";
import { useNavigate, useParams } from "react-router-dom";

function VideoSection({ username, pUserId }) {
  const { meetingCode } = useParams();
  const navigate = useNavigate();

  const { localStream, isVideoOn, isAudioOn } = useMedia();
  const socket = useSocket();

  const [participants, setParticipants] = useState([]);
  const videoRefs = useRef({});
  const remoteStreamsRef = useRef({});
  const [isReady, setIsReady] = useState(false);
  const peerConnections = useRef({});
  const [isRemoteAudioOn, setIsRemoteAudioOn] = useState();

  const createPeerConnection = (remoteSocketId) => {
 const config = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
    
    {
      urls: 'turn:turn.bistri.com:80',
      credential: 'homeo',
      username: 'homeo'
    },
    
    {
      urls: 'turn:turn.anyfirewall.com:443?transport=tcp',
      credential: 'webrtc',
      username: 'webrtc'
    },
    
    {
      urls: 'turn:relay.metered.ca:80',
      credential: 'relayproject',
      username: 'relayproject'
    },
    
    {
      urls: 'turn:relay.metered.ca:443',
      credential: 'relayproject',
      username: 'relayproject'
    }
  ],
  iceTransportPolicy: 'all' 
};

    const pc = new RTCPeerConnection(config);
    pc.remoteSocketId = remoteSocketId;
 
    localStream?.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });

    pc.ontrack = (event) => {
      const remoteStream = event.streams[0];

      setParticipants((prev) =>
        prev.map((p) =>
          p.socketId === remoteSocketId ? { ...p, stream: remoteStream } : p
        )
      );
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          to: remoteSocketId,
          candidate: event.candidate,
        });
      }
    };

    peerConnections.current[remoteSocketId] = pc;
    return pc;
  };

  const sendOffer = async (remoteSocketId) => {
    const pc = createPeerConnection(remoteSocketId);

    try {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      socket.emit("offer", {
        to: remoteSocketId,
        from: socket.id,
        offer: offer,
      });
    } catch (err) {
      console.log("failed to create offer", err);
    }
  };

  //

  useEffect(() => {
    if (!socket) return;
    socket.emit("join-meeting", meetingCode);

    socket.on("user-joined", async (data) => {
      if (data.userName && data.userId && data.socketId) {
        setParticipants((prev) => [
          ...prev,
          {
            userId: data.userId,
            name: data.userName,
            socketId: data.socketId,
            stream: null,
            isVideoOn: true,
            isAudioOn: true,
            isLocal: false,
          },
        ]);
      }

      await sendOffer(data.socketId);
    });

    // receing offer
    socket.on("offer", async (data) => {
      const { from, offer } = data;
      console.log(`receive offer from ${from}`);
      let pc = peerConnections.current[from];
      if (!pc) {
        pc = createPeerConnection(from);
      }
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      //sending answer
      socket.emit("answer", {
        to: from,
        from: socket.id,
        answer: answer,
      });
    });

    // receiving answer
    socket.on("answer", async (data) => {
      const { from, answer } = data;

      const socketId = Object.keys(peerConnections.current).find((key) => {
        const pc = peerConnections.current[key];
        return pc && pc.remoteSocketId === from;
      });
      if (socketId && peerConnections.current[socketId]) {
        await peerConnections.current[socketId].setRemoteDescription(
          new RTCSessionDescription(answer)
        );
      }
    });

    // handling ice-candidates
    socket.on("ice-candidate", async (data) => {
      const { from, candidate } = data;
      console.log("receiving ice candidate from ", from);
      const socketId = Object.keys(peerConnections.current).find((key) => {
        const pc = peerConnections.current[key];
        return pc && pc.remoteSocketId === from;
      });
      if (socketId && peerConnections.current[socketId] && candidate) {
        await peerConnections.current[socketId].addIceCandidate(
          new RTCIceCandidate(candidate)
        );
      }
    });
    socket.on("audio-status", (data) => {
      const { socketId, audioStatus } = data;

      setParticipants((prev) =>
        prev.map((p) =>
          p.socketId === socketId ? { ...p, isAudioOn: audioStatus } : p
        )
      );
    });

    socket.on("video-status", (data) => {
      const { socketId, videoStatus } = data;

      setParticipants((prev) =>
        prev.map((p) =>
          p.socketId === socketId ? { ...p, isVideoOn: videoStatus } : p
        )
      );
    });

    socket.on("user-left", (data) => {
      const { socketId } = data;
      console.log(`Socket ${socketId} left the meeting`);

      if (peerConnections.current[socketId]) {
        peerConnections.current[socketId].close();
        delete peerConnections.current[socketId];
      }

      setParticipants((prev) => prev.filter((p) => p.socketId !== socketId));
    });
    return () => {
      socket.off("user-joined");
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
      socket.off("audio-status");
      socket.off("video-status");
      socket.off("user-left");
    };
  }, [socket]);

  useEffect(() => {
    socket.on("existing-users", async (data) => {
      if (!data || data.length === 0) return;
      data.forEach((user) => {
        setParticipants((prev) => {
          const userExists = prev.some((p) => p.userId === user.userId);
          if (userExists) return prev;

          return [
            ...prev,
            {
              userId: user.userId,
              name: user.userName,
              socketId: user.socketId,
              stream: null,
              isVideoOn: true,
              isAudioOn: true,
              isLocal: false,
            },
          ];
        });
      });
    });
  }, []);

  useEffect(() => {
    if (username && pUserId && socket?.id) {
      setParticipants((prev) => {
        const already = prev.find((p) => p.isLocal === true);
        if (already) return prev;
        setIsReady(true);

        return [
          {
            userId: pUserId,
            name: username,
            socketId: socket.id,
            stream: localStream,
            isVideoOn: isVideoOn,
            isAudioOn: isAudioOn,
            isLocal: true,
          },
          ...prev,
        ];
      });
    }
  }, [localStream, username, pUserId, socket, isVideoOn, isAudioOn]);

  useEffect(() => {
    socket.emit("updated participants", {
      participants,
      meetingCode,
    });
    console.log("emmiting participants", participants);
  }, [participants]);

  useEffect(() => {
    const handleRefresh = () => {
      socket.emit("leave-meeting", {
        socketId: socket.id,
        meetingCode: meetingCode,
      });

      let message = "Bye Bye leaving the meeting !";
      socket.emit("send-messages", {
        message: message,
        code: meetingCode,
      });
      stopAllTracks();
      navigate("/home");
    };

    window.addEventListener("beforeunload", handleRefresh);

    return () => {
      window.removeEventListener("beforeunload", handleRefresh);
    };
  }, [socket, pUserId, meetingCode, localStream]);

  useEffect(() => {
    if (!localStream) return;
    setParticipants((prev) =>
      prev.map((p) => (p.isLocal ? { ...p, stream: localStream } : p))
    );

    const videoTrack = localStream.getVideoTracks()[0];

    Object.values(peerConnections.current).forEach((pc) => {
      const sender = pc.getSenders().find((s) => s.track?.kind === "video");

      if (sender) sender.replaceTrack(videoTrack);
    });
  }, [localStream]);

  if (!isReady) return <p> video is loading</p>;
  return (
    <div className={styles.videoSection}>
      <div className={styles.videoGrid}>
        {participants.map((participant) => (
          <VideoTile key={participant.userId} participant={participant} />
        ))}
      </div>
    </div>
  );
}

export default VideoSection;
