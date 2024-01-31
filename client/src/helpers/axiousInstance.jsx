import axios from 'axios';
export const axiousInstance = axios.create({
    baseUrl: "http://localhost:5000/api",
    headers: {
        Authorization : `Bearer ${localStorage.getItem("token")}`
},
});