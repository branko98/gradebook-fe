<template>
  <div class="py-3 col-md-7" >
    <form @submit.prevent="handleEdit" v-if="professors && professors.length">
        <div class="input-group mb-5">
            <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">Class</span>
            </div>
            <input
            type="text"
            class="form-control"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            v-model="newGradebook.class"
            min="2"
            />
        </div>
        <div class="input-group mb-5" v-if="isProfessorsAvailable()">
            <div class="input-group-prepend">
            <label class="input-group-text" for="inputGroupSelect01">Professors</label>
            </div>
            <select class="custom-select" id="inputGroupSelect01" v-model="newGradebook.professor_id">
            <option selected :value="0">Available</option>
            <option
                v-for="(professor, index) in availableProfessors()"
                :key="index"
                :value="`${professor.id}`"
            >{{ professor.firstName }} {{ professor.lastName }}</option>
            </select>
        </div>
        <table class="table table-bordered" v-if="isStudentsAvailable()">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">First name</th>
                <th scope="col">Last name</th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(student, index) in students" :key="index">
                    <th scope="row">{{ index }}</th>
                    <td> {{ student.firstName }} </td>
                    <td> {{ student.lastName }} </td>
                    <td><a class="btn btn-primary float-right" @click="deleteStudent(student.id)">Delete</a></td>
                </tr>
            </tbody>
        </table>
        <button class="btn btn-primary" type="submit">Edit</button>
        <router-link class="btn btn-light m-2" to="/">Cancel</router-link>
    </form>
  </div>
</template>

<script>
import { professorService } from "../services/professorService";
import { gradebookService } from "../services/gradebookService";
import { userService } from "../services/userService";

export default {
  data() {
    return {
      gradebook: {},
      professors: {},
      students: {},
      newGradebook: {
        class: "",
        professor_id: null
      },
    };
  },
  created() {
    professorService
      .getAll()
      .then(response => {
        this.professors = response.data;
      })
      .catch(e => {
        this.errors.push(e);
      });
    gradebookService.getGradebook(this.$route.params.id)
        .then(response => {
            this.gradebook = response.data;
            this.students = this.gradebook.students;
            this.newGradebook.class = this.gradebook.class;
            this.newGradebook.professor_id = this.gradebook.professor.id;
        }) .catch(e => {
            this.errors.push(e)
        })
  },
  methods: {
    handleEdit() {
      gradebookService.editGradebook(this.$route.params.id, this.newGradebook);
      this.$router.push("/");
    },
   availableProfessors() {
      if(this.professors){
        return this.professors.filter(professor => {
        if (!professor.gradebooks) {
          return professor;
        }
      });
      }
    },
    deleteStudent(id) {
            userService.deleteStudent(id).then(() => {
                gradebookService.getGradebook(this.$route.params.id)
                    .then(response => {
                    this.students = response.data.students;
                    }) .catch(e => {
                        this.errors.push(e)
                    })
            });
        },
    isProfessorsAvailable(){
        if(this.professors){
            return true
        } else {
            return false
        }
    },
    isStudentsAvailable(){
        if(this.students){
            return true
        } else {
            return false
        }
    },
  }
};
</script>