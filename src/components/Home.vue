<template>
  <div>
    <div class="input-group mb-3 py-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-default">Search</span>
      </div>
      <input
        v-model="search"
        type="text"
        class="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-default"
      />
    </div>
    <ul style="list-style-type:none" v-if="gradebooks.length">
      <li class="py-3" v-for="(gradebook, index) in filteredGradebooks" :key="index">
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">Class: {{ gradebook.class }}</h5>
            <h6
              class="card-subtitle mb-2 text-muted"
              v-if="gradebook.firstName"
            >Class professor: {{ gradebook.firstName }} {{ gradebook.lastName }}</h6>
            <p class="card-text">Created at: {{ gradebook.created_at }}</p>
            <router-link class="card-link" :to="`/gradebooks/${gradebook.id}`">Details</router-link>
          </div>
        </div>
      </li>
    </ul>
    <div
      class="alert alert-danger"
      v-if="isGradebooksAvailable"
    >U ovom trenutku nema dnevnika u bazi podataka!</div>
  </div>
</template>

<script>
import { gradebookService } from "../services/gradebookService";

export default {
  data() {
    return {
      gradebooks: [],
      search: '',
      isGradebooksAvailable: false,
    };
  },

  computed: {
      filteredGradebooks() {
      return this.gradebooks.filter(gradebook => {
        return gradebook.class.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },

  created() {
    gradebookService
      .getAll()
      .then(response => {
        this.gradebooks = response.data;
        this.isGradebooksAvailable = !!this.gradebooks.length;
      })
      .catch(e => {
        this.errors.push(e);
      });
  }
};
</script>

