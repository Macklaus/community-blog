<template>
    <div class="row my-5">
        <div class="col-md-6 offset-md-3">
            <div class="card">
                <div class="card-body text-center">
                    <h1>Sing up</h1>
                    <div class="form-group">
                        <input type="text" v-model="name" placeholder="Name" class="form-control" v-bind:class="{'is-invalid': errors.name, 'is-valid': !errors.name && this.submitted}">
                        <div class="errors" v-if="errors.name">
                            <small class="text-danger" :key="error" v-for="error in errors.name">{{error}}</small>
                        </div>
                    </div>
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
                        <button class="btn btn-success form-control" :disabled="loading" @click="registerUser()">
                            <i class="fas fa-spin fa-spinner" v-if="loading"></i>
                            {{ loading ? '' : 'Sing up' }}
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
            name: '',
            username: '',
            password: '',
            errors: {},
            submitted: false,
            loading: false
        }
    },
    methods: {
        registerUser(){
            this.loading = true;
            Axios.post(`${config.apiUrl}/auth/register`, {
                name: this.name,
                email: this.username,
                password: this.password
            }).then(response => {
                this.submitted = true;
                localStorage.setItem('auth', JSON.stringify(response.data.data));
                this.$root.auth = response.data.data;
                this.$router.push('home');
                this.loading = false;
                this.$noty.success("Your profile has been saved!");
            }).catch(({response}) => {
                this.submitted = true;
                this.errors = response.data;
                this.loading = false;
                this.$noty.error("Oops, something went wrong!");
            })
        }
    }
}
</script>

