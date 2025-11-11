import axios from "axios";

const api = axios.create({
  baseURL: "https://vote-polling-pvcc.onrender.com/api", // ✅ exact backend render URL
});

export default api;
