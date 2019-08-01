import axios from 'axios';

export default class ProfessorService {
    constructor() {
        axios.defaults.baseURL = 'http://localhost:8000/api/'
    }

    getAll() {
        return axios.get('professors')
    }

    createProfessor(professor) {
        return axios.post('professors', professor)
    }

    getProfessor(id) {
        return axios.get(`/professors/${id}`)
    }

    // editProfessor(professor, id) {
    //     return axios.put('/professor/' + id, professor)
    // }

    // deleteProfessor(id) {
    //     return axios.delete('/professor/' + id);
    // }
}

export const professorService = new ProfessorService()