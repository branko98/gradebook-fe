<template>
    <div>
        <div class="jumbotron ">
            <h1 class="display-4">This is class {{ gradebook.class }}.</h1>
            <h3 ><b>Main professor of this class is {{ professor.firstName }} {{ professor.lastName }}</b></h3>
            <p class="lead">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
            <hr class="my-4">
            <p class="lead">This class have {{ students.length }} students.</p>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">List of students</button>
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
        </div>
    </div>
</template>

<script>
import { gradebookService } from '../services/gradebookService'

export default {
    
    data() {
        return {
            gradebook: undefined,
            professor: undefined,
            students: {},
        }
    },

  created () {
        gradebookService.getGradebook(this.$route.params.id)
        .then(response => {
            this.gradebook = response.data;
            this.students = this.gradebook.students;
            this.professor = this.gradebook.professor;
        }) .catch(e => {
            this.errors.push(e)
        })
    },
};
</script>

