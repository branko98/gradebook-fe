<template>
   <div class="py-3" >
    <form @submit.prevent="register">
      <div class="input-group mb-5">
            <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">Email</span>
            </div>
            <input
            type="text"
            class="form-control"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            v-model="user.email"
            min="2"
            />
      </div>
       <div class="input-group mb-5">
            <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">Professor id</span>
            </div>
            <input
            type="number"
            class="form-control"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            v-model="user.professor_id"
            />
      </div>
      <div class="input-group mb-5">
            <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">Password</span>
            </div>
            <input
            type="password"
            class="form-control"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            v-model="user.password"
            min="2"
            />
      </div>
      <div class="input-group mb-5">
            <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">Password confirmation</span>
            </div>
            <input
            type="password"
            class="form-control"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            v-model="user.password_confirmation"
            min="2"
            />
      </div>
    <button class="btn btn-primary" type="submit">Register</button>
    </form>

    
  </div>
</template>

<script>
import { authService } from '../services/authService'
export default {
    data () {
        return {
            user: {
                email: "",
                professor_id: "",
                password: "",
                password_confirmation: ""
            }
        }
    },
    created() {
      this.isAuthenticated = authService.isAuthenticated();
    },
    methods: {
        register() {
        authService.register(this.user).then(() => {
            this.isAuthenticated = true
            this.$bus.$emit('logged', 'user')
            this.$router.push('/login');
        });
        }
    }
};
</script>

