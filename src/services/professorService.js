import axios from 'axios';

export default class ProfessorService {
    constructor() {
        axios.defaults.baseURL = 'http://localhost:8000/api/'
    }

    getAll() {
        return axios.get('professors')
    }

    // addProfessor(gradebook) {
    //     return axios.post('professor', professor)
    // }

    // getProfessor(id) {
    //     return axios.get(`/professor/${id}`)
    // }

    // editProfessor(professor, id) {
    //     return axios.put('/professor/' + id, professor)
    // }

    // deleteProfessor(id) {
    //     return axios.delete('/professor/' + id);
    // }
}

export const professorService = new ProfessorService()