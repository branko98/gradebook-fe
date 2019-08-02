import axios from 'axios';

export default class GradebookService {
    constructor() {
        axios.defaults.baseURL = 'http://localhost:8000/api/'
    }

    getAll() {
        return axios.get('gradebooks')
    }

    createGradebook(gradebook) {
        return axios.post('gradebooks', gradebook)
    }

    getGradebook(id) {
        return axios.get(`/gradebooks/${id}`)
    }

    editGradebook(id, gradebook) {
        return axios.put(`/gradebooks/${id}`, gradebook)
    }

    // editGradebook(gradebook, id) {
    //     return axios.put('/gradebooks/' + id, gradebook)
    // }

    deleteGradebook(id) {
        return axios.delete('/gradebooks/' + id);
    }
}

export const gradebookService = new GradebookService()