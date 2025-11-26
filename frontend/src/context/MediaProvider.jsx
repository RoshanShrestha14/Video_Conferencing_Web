import React, { useContext, createContext, useRef, useState } from "react";

const MediaContext = createContext();

export const useMedia = () => useContext(MediaContext);

export const MediaProvider = ({ children }) => {
  const [isVideoAvailable, setIsVideoAvailable] = useState(false);
  const [isAudioAvailable, setIsAudioAvailable] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [localStream, setLocalStream] = useState(null);

  const streamRef = useRef(null); 

  const setLocalStreamfn = (stream) => {
    streamRef.current = stream; // store actual stream
    setLocalStream(stream); // update UI

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
    }
  };

  const toggleAudio = () => {
    const audioTrack = streamRef.current?.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setIsAudioOn(audioTrack.enabled);
    }
  };

  const stopAllTracks = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
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
  };
  return (
    <MediaContext.Provider value={value}>{children}</MediaContext.Provider>
  );
};
