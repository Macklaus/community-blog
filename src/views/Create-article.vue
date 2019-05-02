<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <div class="card my-5">
                    <div class="card-body">
                        <picture-input 
                            ref="pictureInput"
                            width="600" 
                            height="600" 
                            margin="16" 
                            accept="image/jpeg,image/png" 
                            size="5" 
                            button-class="btn btn-danger"
                            :custom-strings="{
                                upload: '<h1>Bummer!</h1>',
                                drag: 'Drag a 😺 GIF or GTFO'
                            }"
                            @change="onChange">
                        </picture-input>
                        <select class="form-control my-3" v-model="category">
                            <option selected>Select a category</option>
                            <option :value="category.id" v-for="category in categories" :key="category.id">
                                {{category.name}}
                            </option>
                        </select>
                        <input type="text" placeholder="Title" class="form-control my-3" v-model="title">
                        <wysiwyg v-model="content" />
                        <div class="text-center">
                            <button @click="createArticle()" class="btn btn-success btn-lg mt-3">Create Article</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PictureInput from 'vue-picture-input';
import Axios from 'axios';
import config from '@/config';

export default {
    mounted(){
        this.getCategories();
    },
    data(){
        return{
            content: '',
            image: null,
            categories: {},
            category: '',
            title: ''
        }
    },
    components: {
        PictureInput
    },
    methods: {
        beforeRouteEnter (to, from, next) {
            if(!localStorage.getItem('auth')){
                return next({path: '/login'});
            }
            next();
        },
        onChange (image) {
            if (image) {
                this.image = image
            } else {
                console.log('FileReader API not supported: use the <form>, Luke!')
            }
        },
        createArticle(){
            const form = new FormData();
            form.append('file', this.image);
            form.append('upload_preset', process.env.VUE_APP_CLOUDINARY_PRESET);
            form.append('api_key', process.env.VUE_APP_CLOUDINARY_API_KEY);
            Axios.post(process.env.VUE_APP_CLOUDINARY_URL, form).then(response => {
                Axios.post(`${config.apiUrl}/articles`, {
                    title: this.title,
                    content: this.content,
                    category_id: this.category,
                    imageUrl: response.data.secure_url
                }, {
                    headers: {
                        Authorization: `Bearer ${this.$root.auth.token}`
                    }
                }).then(() => {
                    this.$noty.success('Article created successfully.');
                    this.$router.push('/home');
                }).catch(() => {
                    this.$noty.error('Something went wrong.');
                });
            }).catch(() => {
                this.$noty.error('Something went wrong.');
            });
        },
        getCategories(){
            const categories = localStorage.getItem('categories');
            if(categories){
                this.categories = JSON.parse(categories);
                return;
            }
            Axios.get(`${config.apiUrl}/categories`).then(response => {
                this.categories = response.data.categories;
                localStorage.setItem('categories', JSON.stringify(this.categories));
            });
        }
    }
}
</script>

