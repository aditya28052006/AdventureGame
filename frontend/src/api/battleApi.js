import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api/battle"
});

export const startBattle = (data) => API.post("/start", data);
export const attack = (battleId) => API.post(`/attack/${battleId}`);
