<template>
    <div  class="mt-4 ">
        <div class="jumbotron " v-if="professor.gradebooks">
            <h1 class="display-4" >This is your class {{ professor.gradebooks.class }}.</h1>
            <p class="lead">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
            <hr class="my-4">
            <div v-if="isStudentsExist">
                <p class="lead">This class have {{ professor.gradebooks.students.length }} students.</p>
                <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target=".bd-example-modal-lg">List of students</button><br>
                <hr class="my-4">
                <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                        <table class="table">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">First name</th>
                                <th scope="col">Last name</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(student, index) in professor.gradebooks.students" :key="index">
                                <th scope="row">{{ index }} </th>
                                <td>{{ student.firstName}} </td>
                                <td>{{ student.lastName}} </td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
            <div
            class="alert alert-danger"
            v-if="!isStudentsExist"
            >Your class has no students at this moment.</div>
            <div class="">
                <router-link class="btn btn-primary clearfix" :to="`/gradebooks/${professor.gradebooks.id}/students/create`" >Add students to your class</router-link>
                <div class="clearfix d-inline">
                    <button class="btn btn-outline-primary float-right" @click="deleteGradebook()">Delete</button>
                    <router-link class="btn btn-light float-right mr-2" :to="`/gradebooks/${professor.gradebooks.id}/edit`" >Edit</router-link>
                </div>

            </div>
        </div>
        <div
        class="alert alert-danger"
        v-if="!isGradebooksAvailable()"
        >You don't have your class at this moment. <a href="/">Go to homepage -></a></div>
    </div>
</template>

<script>
import { userService } from '../services/userService'
import { gradebookService } from '../services/gradebookService'

export default {
    data() {
        return {
            professor: {},
            isCLassExist: false,
            isStudentsExist: false,
            errors: []
        }
    },
  created () {
        userService.getUser()
        .then(response => {
            this.professor = response.data;
            this.isCLassExist = !!this.professor.gradebooks.length;
            this.isStudentsExist = !!this.professor.gradebooks.students.length;
        }) .catch(e => {
            this.errors.push(e)
        })
    },
    methods:{
        deleteGradebook() {
            if(confirm("Do you really want to delete?")){
                gradebookService.deleteGradebook(this.professor.gradebooks.id)
                .then(response => {
                    this.$router.push("/");
                }) .catch(e => {
                    this.errors.push(e)
                })
            }
        },
        isGradebooksAvailable(){
            if(this.professor){
                if(this.professor.gradebooks){
                     return true;
                } else{
                    return false;
                }
            }
        },
    }
};
</script>

