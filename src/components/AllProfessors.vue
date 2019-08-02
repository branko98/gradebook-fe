<template>
  <div>
      <div class="input-group mb-3 mt-3">
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
    <div class="card mb-3" style="max-width: 540px;" v-for="(professor, index) in filteredProfessors" :key="index">
        <div class="row no-gutters">
            <div class="col-md-4">
                <img :src="professor.imgUrl" class="card-img" alt="">
            </div>
            <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title" ><router-link :to="`/professors/${professor.id}`">{{ professor.firstName }} {{ professor.lastName }}</router-link></h5>
                <p class="card-text" v-if="professor.gradebooks">Class: {{ professor.gradebooks.class }}</p>
                <p class="card-text" v-else>This professor is available.</p>
                <p class="card-text"><small class="text-muted"><router-link :to="`/professors/${professor.id}`">Details</router-link></small></p>
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
      professors: [],
      search: "",
    };
  },
  computed: {
      filteredProfessors() {
      return this.professors.filter(professor => {
        return professor.firstName.toLowerCase().includes(this.search.toLowerCase())
      })
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
  }
};
</script>
