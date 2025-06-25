import axios from "axios";

export const ApiClient = axios.create({
  baseURL: "https://api.unsplash.com",
});
