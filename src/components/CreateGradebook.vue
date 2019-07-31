<template>
  <div class="py-3 col-md-7">
    <form @submit.prevent="handleCreate">
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
      <div class="input-group mb-5">
        <div class="input-group-prepend">
          <label class="input-group-text" for="inputGroupSelect01">Professors</label>
        </div>
        <select class="custom-select" id="inputGroupSelect01" v-model="newGradebook.professor_id">
          <option selected>Avalivable</option>
          <option
            v-for="(professor, index) in professors"
            :key="index"
            :value="`${professor.id}`"
          >{{ professor.firstName }} {{ professor.lastName }}</option>
        </select>
      </div>
      <button class="btn btn-primary" type="submit">Create</button>
    </form>
  </div>
</template>

<script>
import { professorService } from "../services/professorService";
import { gradebookService } from "../services/gradebookService";
export default {
  data() {
    return {
      professors: {},
      newGradebook: {
        class: undefined,
        professor_id: undefined
      }
    };
  },
  computed: {
    avalivableProfessors() {
      return this.professors.filter(professor => {
        if (!professor.gradebooks) {
          return professor;
        }
      });
    }
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
  },
  methods: {
    handleCreate() {
      gradebookService.createGradebook(this.newGradebook);
      this.$router.push("/");
    }
  }
};
</script>
