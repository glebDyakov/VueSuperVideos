<template>
  <div class="user">
    <MyNavbar />
    
    <form @submit.prevent class="form-signin text-center" v-if="auth === false">
      <!--  || window.localStorage.getItem('auth') !== 'true' -->
      <img class="mb-4" src="https://cdn4.iconfinder.com/data/icons/logos-brands-5/24/vue-dot-js-256.png" alt="" width="72" height="72">
      <h1 class="h3 mb-3 font-weight-normal">Войдите</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required="">
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" @click="authenticate()">Войти</button>
      <div class="errors" v-if="errorMail == undefined || errorPassword == undefined">
        
      </div>
      <div class="errors" v-else-if="errorMail != undefined">
        <button class="btn btn-danger">{{ 'A ' + errorMail }}</button><br/>
        <button class="btn btn-danger">{{ 'A ' + errorPassword }}</button>
      </div>
      <MyFooter/>
    </form>
    <div v-else>
      <img width="100px" height="100px" :src="photo" /><br/>
      {{ email }}
      <!--
      <div class="mycenter">
        <video width="400" height="300" controls="controls">
          <source :src="vueFilmsOfThisUser[0]">
          Видео недоступно по разрешению правообладателя.
        </video>
      </div>
      -->
      <div class="card" style="" :key="film" v-for="film of vueFilmsOfThisUser">
          <div class="card-body">
            <h5 class="card-title">Название фильма: {{ film.name }}</h5>
            <h5 class="card-title">Режиссёр: {{ film.director }}</h5>
            <h5 class="card-title">Дата: {{ film.date }}</h5>
            <h5 class="card-title">Просмотры: {{ film.views }}</h5>
            <h5 class="card-title">Популярность: {{ film.popularity }}</h5>
            <p class="card-text">Описание: {{ film.description }}.</p>
            <router-link class="btn btn-primary" :to="{ path: '/detailoffilmw', query: { url: film.url }}">
              Play Video
            </router-link>
            <details>
              <summary>Предпросмотр</summary>
              <video :poster="film.poster" width="400" height="300" controls="controls">
                <source :src="film.url">
                Видео недоступно по разрешению правообладателя.
              </video>
            </details>
              
          </div>

        </div>

        <!-- <form @submit.prevent class="form-signin text-center" v-if="auth === false">  -->
      <label for="inputEmail" class="sr-only">oneFilm</label>
      <input v-model="oneFilm" type="text" id="inputEmail" class="form-control" placeholder="FilmRecordName" required="" autofocus="">
      <label for="inputEmail" class="sr-only">Author</label>
      <input disabled v-model="author" type="text" id="inputEmail" class="form-control" placeholder="Author" required="" autofocus="">
      <label for="inputEmail" class="sr-only">Date</label>
      <input v-model="date" type="number" id="inputEmail" class="form-control" placeholder="Date" required="" autofocus="">
      <label for="inputEmail" class="sr-only">Description</label>
      <input v-model="description" type="text" id="inputEmail" class="form-control" placeholder="Description" required="" autofocus="">
      <label for="inputEmail" class="sr-only">Views</label>
      <input v-model="views" type="number" id="inputEmail" class="form-control" placeholder="Views" required="" autofocus="">
      <label for="inputEmail" class="sr-only">Popularity</label>
      <input v-model="popularity" type="number" id="inputEmail" class="form-control" placeholder="Popularity" required="" autofocus="">
      <label for="inputEmail" class="sr-only">Poster</label>
      <input v-model="poster" type="text" id="inputEmail" class="form-control" placeholder="Poster" required="" autofocus="">
      <label for="inputEmail" class="sr-only">Url</label>
      <input v-model="url" type="text" id="inputEmail" class="form-control" placeholder="Url" required="" autofocus="">
      <label for="inputEmail" class="sr-only">Name</label>
      <input v-model="name" type="text" id="inputEmail" class="form-control" placeholder="Name" required="" autofocus="">
      <label for="inputEmail" class="sr-only">Director</label>
      <input v-model="director" type="text" id="inputEmail" class="form-control" placeholder="Director" required="" autofocus="">
      <div class="d-grid gap-2">
        <button @click="addNewVideoToMyVideos()" class="btn btn-primary" type="button">Add new video to my videos</button>
      </div>
<!--       
      <p class="mt-5 mb-3 text-muted">© 2017-2018</p> 

    </form> -->

      <!--
      {{ vueFilmsOfThisUser }}
      -->
    </div>
  </div>
</template>
<script src="https://unpkg.com/vuefire@1.3.0/dist/vuefire.js"></script>
<script src="https://www.gstatic.com/firebasejs/3.4.0/firebase.js"></script>
<script src="https://www.gstatic.com/firebasejs/3.1.0/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/3.1.0/firebase-database.js"></script>
<script>
import MyNavbar from '@/components/MyNavbar.vue';
import MyFooter from '@/components/MyFooter.vue';
import firebase from 'firebase/app';
import * as fb from 'firebase';
const vueFilmsOfThisUser = [];
const vueusers = [];
// let myFirebaseConfig = {
//     apiKey: "AIzaSyAhI25hD5Yv1eHaDsOEb6J7pAPFSCagSTQ",
//     authDomain: "vueusers-d7a7e.firebaseapp.com",
//     databaseURL: "https://vueusers-d7a7e-default-rtdb.firebaseio.com",
//     projectId: "vueusers-d7a7e",
//     storageBucket: "vueusers-d7a7e.appspot.com",
//     messagingSenderId: "222841222603",
//     appId: "1:222841222603:web:c935d47616057664b9724e"
//   };
//   // Initialize Firebase
// firebase.initializeApp(myFirebaseConfig);
let database = firebase.database()

export default {
  name: 'User',
  components: {
    MyNavbar,
    MyFooter
  },
  created(){
    this.errorEmail = ' '
    this.errorPassword = ' '
  },
  data:()=>({
    vueusers,
    vueFilmsOfThisUser,
    email:'',
    errorPassword:' ',
    errorEmail:' ',
    password:'',
    auth : false,
    date:0,
    oneFilm:`${Math.random() * 10}`,
    author:'',
    description:'',
    director:'',
    name:'',
    popularity:0,
    poster:'',
    url:'',
    views:0,
  }),
  methods:{
    addNewVideoToMyVideos(){
      M.toast({html: 'Новое видео добавлено!'})
      console.log('added video')
      // ref.on('child_added', function(childSnapshot, prevChildKey) {
      //   childSnapshot
      // });
      database.ref(`/films/${this.oneFilm}`).set({
        author:this.author,
        date:this.date,
        description:this.description,
        director:this.director,
        name:this.name,
        popularity:this.popularity,
        poster:this.poster,
        url:this.url,
        views:this.views,
      })
    },
    authenticate(){
      database.ref('/users').on('value', snapshot => {
      snapshot.forEach((oneUser) => {
        // let myUser = oneUser.val()
        // this.vueusers.push(myUser)
        // console.log(oneUser.val())
        this.email == oneUser.val().email && this.password == oneUser.val().password ? this.auth = true : false;
        if(this.email == oneUser.val().email && this.password == oneUser.val().password){
          window.localStorage.setItem("auth", "true");
          console.log(`Login ${oneUser.val().name}`)
          this.photo = oneUser.val().photo;
          //ниже правильно но не работает
          this.author = oneUser.val().name
          database.ref('/films').on('value', filmlist => {
            filmlist.forEach((oneFilm) => {
              console.log(myfilm)
              let myfilm = oneFilm.val();
              if(myfilm.author === oneUser.val().name){
                this.vueFilmsOfThisUser.push(myfilm)
              }
              
            })
            this.vueFilmsOfThisUser
          });
        } else if(this.email != oneUser.val().email || this.password != oneUser.val().password){
            this.errorMail = 'Введён неправильный email.'
            console.log('неправильно email', this.errorMail)
            if(this.password != oneUser.val().password){
              this.errorPassword = 'Введён неправильный пароль.'
              console.log('неправильно пароль', this.errorPassword)
            }
        }
        

      })
    });
    console.log(this.vueFilmsOfThisUser)
    }
  },
  mounted(){

  }
}
</script>
<style scoped>

</style>