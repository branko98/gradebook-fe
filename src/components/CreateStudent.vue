<template>
  <div class="mt-3 col-md-7">
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
            v-model="newStudent.firstName"
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
          v-model="newStudent.lastName"
          min="2"
        />
      </div>
    <button class="btn btn-primary" type="submit">Create</button>
    </form>
  </div>
</template>

<script>
import { userService } from "../services/userService";

export default {
  data() {
    return {
      newStudent: {
        firstName: "",
        lastName: "",
        gradebook_id: Number(this.$route.params.id)
      }
    };
  },
  methods: {
    handleCreate() {
      userService.createStudent(this.newStudent);
      this.$router.push("/");
    }
  },
  created(){
    
  }
};
</script>
