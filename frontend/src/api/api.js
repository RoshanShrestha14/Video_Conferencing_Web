import axios from "axios";


const API = axios.create({
  baseURL:
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_API_URL  // Note: VITE_ prefix!
      : import.meta.env.VITE_LOCAL_API,  // Note: VITE_ prefix!
  withCredentials: true,
});

export default API;