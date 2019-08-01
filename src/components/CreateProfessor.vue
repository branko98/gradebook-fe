<template>
  <div class="py-3 col-md-7">
    <form @submit.prevent="handleCreate">
        <div class="input-group mb-5">
            <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">First Name</span>
            </div>
            <input
            type="text"
            class="form-control"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            v-model="newProfessor.firstName"
            min="2"
            />
      </div>
      <div class="input-group mb-5">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-default">Last Name</span>
        </div>
        <input
          type="text"
          class="form-control"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          v-model="newProfessor.lastName"
          min="2"
        />
      </div>
      <div class="input-group mb-5">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-default">Image URL</span>
        </div>
        <input
          type="text"
          class="form-control"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          v-model="newProfessor.imgUrl"
          min="2"
        />
      </div>
    <button class="btn btn-primary" type="submit">Create</button>
    </form>
  </div>
</template>

<script>
import { professorService } from "../services/professorService";

export default {
  data() {
    return {
      newProfessor: {
        firstName: "",
        lastName: "",
        imgUrl: "",

      }
    };
  },
  methods: {
    handleCreate() {
      professorService.createProfessor(this.newProfessor);
      this.$router.push("/professors");
    }
  }
};
</script>
