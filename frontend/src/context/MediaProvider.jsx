import React, { useContext, createContext, useRef, useState } from "react";

const MediaContext = createContext();

export const useMedia = () => useContext(MediaContext);

export const MediaProvider = ({ children }) => {
  const [isVideoAvailable, setIsVideoAvailable] = useState(false);
  const [isAudioAvailable, setIsAudioAvailable] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [localStream, setLocalStream] = useState(null);

  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const streamRef = useRef(null); 




  const setLocalStreamfn = (stream) => {
    streamRef.current = stream;
    setLocalStream(stream);

    if (stream) {
      const hasVideo = stream.getVideoTracks().length > 0;
      const hasAudio = stream.getAudioTracks().length > 0;

      setIsVideoAvailable(hasVideo);
      setIsAudioAvailable(hasAudio);
      setIsVideoOn(hasVideo);
      setIsAudioOn(hasAudio);
    }
  };


  const toggleVideo = () => {
    const videoTrack = streamRef.current?.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoOn(videoTrack.enabled);
      return(videoTrack.enabled);
    }
  };




  const toggleAudio = () => {
    const audioTrack = streamRef.current?.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setIsAudioOn(audioTrack.enabled);
      return(audioTrack.enabled)

    }
  };



  const stopAllTracks = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  };

  const startScreenShare = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false, 
      });

      setIsScreenSharing(true);
      setLocalStreamfn(screenStream);
      screenStream.getVideoTracks()[0].onended = () => {
        stopScreenShare();
      };
    } catch (err) {
      console.error("Screen share error:", err);
    }
  };

  const stopScreenShare = async () => {

    if (isScreenSharing) {
      stopAllTracks();
      setIsScreenSharing(false);

      try {
        const camStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setLocalStreamfn(camStream);
      } catch (err) {
        console.error("Failed to restore camera:", err);
      }
    }
  };

  const value = {
    localStream,
    setLocalStream: setLocalStreamfn,

    isVideoOn,
    isAudioOn,
    isVideoAvailable,
    isAudioAvailable,

    toggleVideo,
    toggleAudio,

    stopAllTracks,

    isScreenSharing,
    startScreenShare,
    stopScreenShare,
  };

  return (
    <MediaContext.Provider value={value}>
      {children}
    </MediaContext.Provider>
  );
};
