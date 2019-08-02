<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="/">
          Gradebook
          <b>App</b>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/professors">Professors</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/mygradebook" v-if="isAuthenticated">My Gradebook</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/gradebooks/create" v-if="isAuthenticated">Create Gradebook</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/professors/create" v-if="isAuthenticated">Create Professor</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/login" v-if="!isAuthenticated">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/register" v-if="!isAuthenticated">Register</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="logout" v-if="isAuthenticated">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container">
      <div class="row">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { authService } from "./services/authService";

export default {
  data() {
    return {
      isAuthenticated: authService.isAuthenticated()
    };
  },
  created() {
         this.$bus.$on('logged', () => {
             this.isAuthenticated = authService.isAuthenticated()
         })
    },
 methods: {
    logout() {
      authService.logout();
      this.isAuthenticated = false;
    }
  }
};
</script>