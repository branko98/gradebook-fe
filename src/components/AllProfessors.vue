<template>
  <div></div>
</template>

<script>
import { professorService } from "../services/professorService";

export default {
  data() {
    return {
      professors: []
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
  }
};
</script>
