<template>
  <div class="py-3 d-flex justify-content-center">
    <div class="card mb-3 col-md-7 py-3 ">
      <img
        src="https://www.vpr.org/sites/vpr/files/styles/x_large/public/201903/Marcelo-Gleiser-Dartmouth-20190227.jpg"
        class="card-img-top"
      />
      <div class="card-body">
        <h5 class="card-title">{{ professor.firstName }} {{ professor.lastName }}</h5>
        <p class="card-text" v-if="professor.gradebooks">
          Class:
          <router-link
            :to="`/gradebooks/${professor.gradebooks.id}`"
          >{{ professor.gradebooks.class }}</router-link>
        </p>
        <p class="card-text" v-else>This professor is avalivable.</p>
        <p class="card-text">
          <b>Biography:</b>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui
        </p>
        <p><b>This class have {{ students.length }} students.</b></p>
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target=".bd-example-modal-lg"
        >List of students</button>
        <div
          class="modal fade bd-example-modal-lg"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myLargeModalLabel"
          aria-hidden="true"
        >
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
                    <th scope="row">{{ index }}</th>
                    <td>{{ student.firstName}}</td>
                    <td>{{ student.lastName}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { professorService } from "../services/professorService";
export default {
  data() {
    return {
      professor: {},
      students: {},
    };
  },
  created() {
    professorService
      .getProfessor(this.$route.params.id)
      .then(response => {
        this.professor = response.data;
        this.students = this.professor.gradebooks.students;
      })
      .catch(e => {
        this.errors.push(e);
      });
  }
};
</script>

