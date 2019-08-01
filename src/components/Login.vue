<template>
   <div class="py-3" >
    <form @submit.prevent="login">
      <div class="input-group mb-5">
            <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">Email</span>
            </div>
            <input
            type="text"
            class="form-control"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            v-model="email"
            min="2"
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
            v-model="password"
            min="2"
            />
      </div>
    <button class="btn btn-primary" type="submit">Login</button>
    </form>

    
  </div>
</template>

<script>
import { authService } from '../services/authService'
export default {
    data () {
        return {
            email: "",
            password: ""
        }
    },
    methods: {
        login() {
            authService.login(this.email, this.password).then(() => {
                this.$router.push("/");
            });
        }
    }
};
</script>

