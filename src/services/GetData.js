
import axios from 'axios';
const API_URL = 'https://15fasj3enj.execute-api.us-east-1.amazonaws.com/desa/api';

export const serviceGetMonedas = async () => {
    return axios.get(`${API_URL}/monedas?q=ewogICJwYWlzIjogIjU2IiwKICAiY2xhc0JpZW4iOiAiMTIwMDEiCn0=`)
        .then(response => { return response.data })
        .catch(err => { return err.response.data })
}

export const serviceGetComunas = async () => {
    return axios.get(`${API_URL}/generales?q=ewoicnV0Q2lhIjo5OTA2MTAwMCwKInBhcmFtZXRybyI6IDQ1Cn0=`)
        .then(response => { return response.data })
        .catch(err => { return err.response.data })
}

export const serviceCreateClient = async (HEADERS, data) => {
    return axios.post(`https://15fasj3enj.execute-api.us-east-1.amazonaws.com/desa/api/ingresa-persona`, data, HEADERS)
        .then(response => { return response.data })
        .catch(err => { return err.response.data })
}



