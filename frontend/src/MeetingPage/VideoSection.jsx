import React, { use, useEffect, useRef, useState } from "react";
import styles from "./Room.module.css";
import { useMedia } from "../context/MediaProvider";
import { useSocket } from "../context/socketContext";
import VideoTile from "./memo/VideoTile";
import { useParams } from "react-router-dom";

function VideoSection({ username, pUserId }) {
  const { meetingCode } = useParams();

  const { localStream, isVideoOn, isAudioOn } = useMedia();
  const socket = useSocket();
  const userInfoMap = useRef({});

  const [participants, setParticipants] = useState([]);
  const videoRefs = useRef({});
  const remoteStreamsRef = useRef({});
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!socket) return;
    socket.emit("join-meeting", meetingCode);

    socket.on("user-joined", (data) => {
      console.log("User joined:", data);
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
    });
  }, [socket]);

  useEffect(() => {
    socket.on("existing-users", (data) => {
      if (!data || data.length === 0) return; // stop if empty array
      console.log("exising user ", data);

      data.map((user) => {
        setParticipants((prev) => [
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
        ]);
      });
    });
  }, []);

  // existingUsers.push({
  //           userId: otherSocketObject.userId,
  //           userName: otherSocketObject.userName,
  //           socketId: otherSocketObject.id,
  //         });

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
    console.log("all participants are : ", participants);
  }, [participants]);
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
