import axios from 'axios';

export default class UserService {
    constructor() {
        axios.defaults.baseURL = 'http://localhost:8000/api/'
    }

    getUser() {
        return axios.get('user')
    }

    createStudent(student){
        return axios.post('students', student)
    }

    getComments() {
        return axios.get('comments')
    }

    createComment(comment) {
        return axios.post('comments', comment)
    }

    deleteComment(id) {
        return axios.delete('/comments/' + id);
    }

    deleteStudent(id) {
        return axios.delete('/students/' + id);
    }

    // createGradebook(gradebook) {
    //     return axios.post('gradebooks', gradebook)
    // }

    // getGradebook(id) {
    //     return axios.get(`/gradebooks/${id}`)
    // }

    // editGradebook(gradebook, id) {
    //     return axios.put('/gradebooks/' + id, gradebook)
    // }

    // deleteGradebook(id) {
    //     return axios.delete('/gradebooks/' + id);
    // }
}

export const userService = new UserService()