import React, { useRef, createContext, useContext, useEffect, useState } from "react";
const VITE_API_URL = import.meta.env.VITE_API_URL;


import { io } from "socket.io-client"; 

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    socketRef.current = io(VITE_API_URL, {
      withCredentials: true,
      autoConnect: true,
    });

    socketRef.current.on("connect", () => {
      console.log(`Socket connected: ${socketRef.current.id}`);
      setIsReady(true);  
    });
    return () => {
      if (socketRef.current) {
        console.log("Closing socket...");
        socketRef.current.close();
      }
    };
  }, []);

  if (!isReady) return  <p>connecting.........</p>;

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};
