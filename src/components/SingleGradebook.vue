<template>
    <div  class="mt-4 ">
        <div class="jumbotron ">
            <h1 class="display-4" >This is class {{ gradebook.class }}.</h1>
            <h3><b>Main professor of this class is {{ professor.firstName }} {{ professor.lastName }}</b></h3>
            <p class="lead">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
            <hr class="my-4">
            <p class="lead">This class have {{ students.length }} students.</p>
            <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target=".bd-example-modal-lg">List of students</button>
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
                            <tr v-for="(student, index) in students" :key="index">
                            <th scope="row">{{ index }} </th>
                            <td>{{ student.firstName}} </td>
                            <td>{{ student.lastName}} </td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
            <div v-if="isAuthenticated">
                <hr class="my-4">
                <router-link class="btn btn-primary" :to="`/gradebooks/${this.$route.params.id}/students/create`" >Add students to your class</router-link>
                <div class="clearfix d-inline">
                    <button class="btn btn-outline-primary float-right" @click="">Delete</button>
                    <router-link class="btn btn-light float-right mr-2" :to="`/gradebooks/${gradebook.id}/edit`" >Edit</router-link>
                </div>
            </div>  
        </div>
        <h3>Comments:</h3>
        <div v-for="(comment, index) in comments" :key="index">
            <hr class="my-4">
            <div class="media">
                <img :src="comment.professor.imgUrl" class="mr-3 center-cropped" alt="...">
                <div class="media-body">
                    <h5 class="mt-0"> {{ comment.professor.firstName }}  {{ comment.professor.lastName }}</h5>
                     <p>{{ comment.content }}</p>
                    <span><small class="text-muted">Created at: {{ comment.created_at }} </small></span>
                    <div class="clearfix d-inline">
                    <button v-if="isAuthenticated" class="btn btn-outline-primary float-right" @click="removeComment(comment.id)">Remove</button>
                    </div>
                </div>
            </div>
        </div>
        <form @submit.prevent="createComment" class="mt-4 ">
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">Comment</span>
                </div>
                <textarea class="form-control" aria-label="With textarea" v-model="newComment.content"></textarea>
            </div>
            <button class="btn btn-primary mt-3" type="submit">Post comment</button>
        </form>
    </div>
</template>

<script>
import { authService } from '../services/authService'
import { gradebookService } from '../services/gradebookService'
import { userService } from '../services/userService'

export default {
    
    data() {
        return {
            isAuthenticated: authService.isAuthenticated(),
            gradebook: {},
            professor: {},
            students: {},
            newComment: {
                content: "",
                gradebook_id: undefined,
            },
            comments: [],
        }
    },

  created () {
        gradebookService.getGradebook(this.$route.params.id)
        .then(response => {
            this.gradebook = response.data;
            this.students = this.gradebook.students;
            this.professor = this.gradebook.professor;
            this.newComment.gradebook_id = this.gradebook.id
            this.comments = this.gradebook.comments
        }) .catch(e => {
            this.errors.push(e)
        })
    },
    methods: {
        createComment(){
           userService.createComment(this.newComment).then(() => {
               gradebookService.getGradebook(this.$route.params.id)
                .then(response => {
                    this.gradebook = response.data
                    this.comments = this.gradebook.comments
                }) .catch(e => {
                    this.errors.push(e)
                })
            });
        },
        removeComment(id) {
            userService.deleteComment(id).then(() => {
                gradebookService.getGradebook(this.$route.params.id)
                .then(response => {
                    this.gradebook = response.data
                    this.comments = this.gradebook.comments
                }) .catch(e => {
                    this.errors.push(e)
                })
            });
        },
        deleteGradebook() {
            if(confirm("Do you really want to delete?")){
                gradebookService.deleteGradebook(this.$route.params.id)
                .then(response => {
                    this.$router.push("/");
                }) .catch(e => {
                    this.errors.push(e)
                })
            }
        }
    }
};
</script>

<style>
.center-cropped {
  width: 100px;
  height: 100px;
  background-position: center center;
  background-repeat: no-repeat;
}
</style>