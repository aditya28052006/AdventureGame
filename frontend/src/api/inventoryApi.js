import axios from 'axios';
const API = axios.create({
    baseURL: "http://localhost:8080/api/inventory"
});

export const getInventory = (characterId) => API.get(`/${characterId}`);
export const usePotion = (characterId) => API.post(`/use-potion/${characterId}`);