<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <img src="../assets/logo.png" width="30px" height="30px">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav" style="width: 100%">
                <li class="nav-item active p-2" v-if="isAuth">
                    <router-link class="nav-link" to="/home">Home <span class="sr-only">(current)</span></router-link>
                </li>
                <li class="nav-item p-2" v-if="isAuth">
                    <router-link class="nav-link" to="/articles/create">Create new article</router-link>
                </li>
                <li class="nav-item p-2" v-if="!isAuth">
                    <router-link class="nav-link" to="/login">Login</router-link>
                </li>
                <li class="nav-item p-2" v-if="!isAuth">
                    <router-link class="nav-link" to="/singup">Sing up</router-link>
                </li>
                <li class="nav-item dropdown ml-auto p-2" v-if="isAuth">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Hey {{$root.auth.user.name}}
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <!-- <a class="dropdown-item" href="#">Action</a>
                    <div class="dropdown-divider"></div> -->
                    <a class="dropdown-item" @click="logout()" href="#">Log out</a>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    mounted(){

    },
    computed: {
        isAuth(){
            return this.$root.auth.user;
        }
    },
    methods: {
        logout(){
            localStorage.removeItem('auth');
            this.$root.auth = {};
            this.$router.push('/login');
            this.$noty.info("You are logout now!");
        }
    }
}
</script>

