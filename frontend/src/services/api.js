
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getSkills = async () => {
    const response = await api.get('/skills');
    return response.data;
};

export const getProjects = async () => {
    const response = await api.get('/projects');
    return response.data;
};

export const getEducation = async () => {
    const response = await api.get('/education');
    return response.data;
};

export const getExperience = async () => {
    const response = await api.get('/experience');
    return response.data;
};

export const askAI = async (question, history = []) => {
    const response = await api.post('/chat', {
        question,
        history,
    });
    return response.data;
};

export default api;
