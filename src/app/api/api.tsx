import axios from "axios";

const apiFootball = axios.create({
  baseURL: "https://v3.football.api-sports.io",
  headers: {
    "x-api-key": process.env.API_FOOTBALL_KEY as string, // Use the environment variable securely
  },
});

export default apiFootball;
