import React, { useRef, createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client"; // IMPORTANT

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    socketRef.current = io("http://localhost:3002", {
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

  if (!isReady) return null;

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};
