<template>
  <div class="user">
    <MyNavbar />
    
    <form @submit.prevent class="form-signin text-center" v-if="auth === false">
      <!--  || window.localStorage.getItem('auth') !== 'true' -->
      <img class="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required="">
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" @click="authenticate()">Sign in</button>
      <div class="errors" v-if="errorMail == undefined || errorPassword == undefined">
        
      </div>
      <div class="errors" v-else-if="errorMail != undefined">
        <button class="btn btn-danger">{{ 'A ' + errorMail }}</button><br/>
        <button class="btn btn-danger">{{ 'A ' + errorPassword }}</button>
      </div>
      <p class="mt-5 mb-3 text-muted">© 2017-2018</p> 

    </form>

    <div v-else>

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
      <input v-model="oneFilm" type="text" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
      <label for="inputEmail" class="sr-only">Author</label>
      <input disabled v-model="author" type="text" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
      <label for="inputEmail" class="sr-only">Date</label>
      <input v-model="date" type="number" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
      <label for="inputEmail" class="sr-only">description</label>
      <input v-model="description" type="text" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
      <label for="inputEmail" class="sr-only">views</label>
      <input v-model="views" type="number" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
      <label for="inputEmail" class="sr-only">popularity</label>
      <input v-model="popularity" type="number" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
      <label for="inputEmail" class="sr-only">poster</label>
      <input v-model="poster" type="text" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
      <label for="inputEmail" class="sr-only">url</label>
      <input v-model="url" type="text" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
      <label for="inputEmail" class="sr-only">Name</label>
      <input v-model="name" type="text" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
      <label for="inputEmail" class="sr-only">Director</label>
      <input v-model="director" type="text" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
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
    MyNavbar
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
    date:2000,
    oneFilm:`${Math.random() * 10}`,
    author:'RandomAuthor',
    description:'MyDescription',
    director:'RandomDirector',
    name:'filmName',
    popularity:5,
    poster:'"https://r5---sn-4g5e6nsr.googlevideo.com/videoplayback?expire=1611678446&ei=ju4PYNyMJarshwaZrpuQCw&ip=64.145.79.28&id=o-AIZ9Zi5LErYU8VBREzIEdfejvXbU1oqIQCQaI4CgM4Mj&itag=248&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&vprv=1&mime=video%2Fwebm&ns=IdbgUCO5yH3AaV42uN4raKYF&gir=yes&clen=35253411&dur=166.666&lmt=1605665214045639&fvip=5&keepalive=yes&c=WEB&txp=5511222&n=onMdSwAJudfak2CYo5&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRAIgJpKZS6mTB2emqnxgvEpQphP_8bd-CHXnWrrejm6qWXkCIBz8I3JJEWdeJKHjohrzbSzkhBDb39CSfQEGMboOBMyG&redirect_counter=1&cm2rm=sn-ab5r676&req_id=eda83343ad45a3ee&cms_redirect=yes&mh=hd&mip=178.167.20.41&mm=34&mn=sn-4g5e6nsr&ms=ltu&mt=1611656672&mv=m&mvi=5&pl=18&lsparams=mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIhANaBMQZIvAlfekdqEhrrp40YuZmTqGxOppl52XDKC4hOAiBMHqMPgWfROGAfk9XQTNAQbOidIt4xibkafVrQqF86ig%3D%3D"',
    url:'"https://r5---sn-4g5e6nsr.googlevideo.com/videoplayback?expire=1611678446&ei=ju4PYNyMJarshwaZrpuQCw&ip=64.145.79.28&id=o-AIZ9Zi5LErYU8VBREzIEdfejvXbU1oqIQCQaI4CgM4Mj&itag=248&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&vprv=1&mime=video%2Fwebm&ns=IdbgUCO5yH3AaV42uN4raKYF&gir=yes&clen=35253411&dur=166.666&lmt=1605665214045639&fvip=5&keepalive=yes&c=WEB&txp=5511222&n=onMdSwAJudfak2CYo5&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRAIgJpKZS6mTB2emqnxgvEpQphP_8bd-CHXnWrrejm6qWXkCIBz8I3JJEWdeJKHjohrzbSzkhBDb39CSfQEGMboOBMyG&redirect_counter=1&cm2rm=sn-ab5r676&req_id=eda83343ad45a3ee&cms_redirect=yes&mh=hd&mip=178.167.20.41&mm=34&mn=sn-4g5e6nsr&ms=ltu&mt=1611656672&mv=m&mvi=5&pl=18&lsparams=mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIhANaBMQZIvAlfekdqEhrrp40YuZmTqGxOppl52XDKC4hOAiBMHqMPgWfROGAfk9XQTNAQbOidIt4xibkafVrQqF86ig%3D%3D"',
    views:50,
  }),
  methods:{
    addNewVideoToMyVideos(){
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
        } else if(this.email != oneUser.val().email){
            this.errorMail = 'Введён неправильный email.'
            console.log('неправильно email', this.errorMail)
        }
        if(this.password != oneUser.val().password){
            this.errorPassword = 'Введён неправильный пароль.'
          console.log('неправильно пароль', this.errorPassword)
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