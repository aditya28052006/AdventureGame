import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api/characters",
});

export const createCharacter = (data) => API.post("/create", data);