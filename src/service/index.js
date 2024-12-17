import axios from "axios";

// Use import.meta.env to access the environment variable
axios.defaults.baseURL = `https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_PUBLIC_API_KEY}`;

export default axios;
