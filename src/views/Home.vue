<template>
    <div>
        <div class="d-flex mt-4 justify-content-between">
            <button @click="getPreviusArticles()" :disabled="articles.prev_page_url === null" class="btn btn-warning">
                <i class="fas fa-chevron-circle-left"></i>
                Prev Page
            </button>
            <button @click="getNextArticles()" :disabled="articles.next_page_url === null" class="btn btn-warning">
                Next Page
                <i class="fas fa-chevron-circle-right"></i>
            </button>
        </div>
        <div class="row" v-if="!loading">
            <div class="col-md-8 offset-md-2" v-for="article in articles.data" v-if="articles.data" :key="article.id">
                <Article :article="article"/>
            </div>
        </div>
        <div class="loader text-center" v-else>
            <i class="fas fa-5x fa-spin fa-spinner"></i>
        </div>
    </div>
</template>

<script>
import Axios from 'axios';
import config from '@/config';
import Article from '@/components/Article.vue';

export default {
    components: {
        Article
    },
    beforeRouteEnter (to, from, next) {
        if(!localStorage.getItem('auth')){
            return next({path: '/login'});
        }
        next();
    },
    mounted(){
        this.getArticles();
    },
    data(){
        return {
            articles: {},
            loading: false
        }
    },
    methods: {
        getArticles(url = `${config.apiUrl}/articles`) {
            this.loading = true;
            Axios.get(url).then(response => {
                this.articles = response.data.data;
                this.loading = false;
            });
        },
        getNextArticles(){
            this.getArticles(this.articles.next_page_url);
        },
        getPreviusArticles(){
            this.getArticles(this.articles.prev_page_url);
        }
    }
}
</script>

<style>
    .btn-warning{
        color: #fff !important;
    }
</style>


