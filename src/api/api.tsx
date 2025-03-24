import axios from "axios";
import { urls } from "./service";

const api = axios.create({
  baseURL: `${urls.backend}api`, // Replace with your actual backend URL
  headers: {
    "Content-Type": "application/json",

  },
});

export default api;


