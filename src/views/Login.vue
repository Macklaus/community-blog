<template>
    <div class="row my-5">
        <div class="col-md-6 offset-md-3">
            <div class="card">
                <div class="card-body text-center">
                    <h1>Login</h1>
                    <div class="form-group">
                        <input type="text" v-model="username" placeholder="Username" class="form-control" v-bind:class="{'is-invalid': errors.email, 'is-valid': !errors.email && this.submitted}">
                        <div class="errors" v-if="errors.email">
                            <small class="text-danger" :key="error" v-for="error in errors.email">{{error}}</small>
                        </div>
                    </div>
                    <div class="form-group">
                        <input type="password" v-model="password" placeholder="Password" class="form-control" v-bind:class="{'is-invalid': errors.password, 'is-valid': !errors.password && this.submitted}">
                        <div class="errors" v-if="errors.password">
                            <small class="text-danger" :key="error" v-for="error in errors.password">{{error}}</small>
                        </div>
                    </div>
                    <div class="form-group text-center">
                        <button class="btn btn-success form-control" :disabled="loading" @click="loginUser()">
                            <i class="fas fa-spin fa-spinner" v-if="loading"></i>
                            {{ loading ? '' : 'Login' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Axios from 'axios';
import config from '@/config';

export default {
    beforeRouteEnter (to, from, next) {
        if(localStorage.getItem('auth')){
            return next({path: '/home'});
        }
        next();
    },
    data(){
        return {
            username: '',
            password: '',
            errors: {},
            submitted: false,
            loading: false
        }
    },
    methods: {
        loginUser(){
            this.loading = true;
            Axios.post(`${config.apiUrl}/auth/login`, {
                email: this.username,
                password: this.password
            }).then(response => {
                this.submitted = true;
                this.$root.auth = response.data.data;
                localStorage.setItem('auth', JSON.stringify(response.data.data));
                this.loading = false;
                this.$router.push('home');
                this.$noty.success("Successfully login!");
            }).catch(({response}) => {
                this.$noty.error("Oops, something went wrong!");
                this.submitted = true;
                if(response.status === 401){
                    this.errors = {
                        email: ['These credentials are invalid'],
                        password: ['These credentials are invalid']
                    }
                } else {
                    this.errors = response.data;
                }
                this.loading = false;
            })
        }
    }
}
</script>
