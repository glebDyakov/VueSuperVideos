<template>
  <div class="home">
    <MyNavbar/>
    <div class="myfilms">
        <div class="card" style="" :key="film" v-for="film of vuefilms">
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
    </div>    
  </div>
</template>
<script src="https://unpkg.com/vuefire@1.3.0/dist/vuefire.js"></script>
<script src="https://www.gstatic.com/firebasejs/3.4.0/firebase.js"></script>
<script src="https://www.gstatic.com/firebasejs/3.1.0/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/3.1.0/firebase-database.js"></script>
<script>
import firebase from 'firebase/app';
import * as fb from 'firebase';
import MyNavbar from '@/components/MyNavbar.vue';
const vuefilms = [];
// let firebaseConfig = {
//   apiKey: "AIzaSyAs2iNICjyyGgXQvtRTtYt67712RCcFOVs",
//   authDomain: "listoffilms-8536f.firebaseapp.com",
//   databaseURL: "https://listoffilms-8536f-default-rtdb.firebaseio.com",
//   projectId: "listoffilms-8536f",
//   storageBucket: "listoffilms-8536f.appspot.com",
//   messagingSenderId: "595539552049",
//   appId: "1:595539552049:web:1ba327027936ede9ff3210"
// };
// firebase.initializeApp(firebaseConfig);

var myFirebaseConfig = {
    apiKey: "AIzaSyAhI25hD5Yv1eHaDsOEb6J7pAPFSCagSTQ",
    authDomain: "vueusers-d7a7e.firebaseapp.com",
    databaseURL: "https://vueusers-d7a7e-default-rtdb.firebaseio.com",
    projectId: "vueusers-d7a7e",
    storageBucket: "vueusers-d7a7e.appspot.com",
    messagingSenderId: "222841222603",
    appId: "1:222841222603:web:c935d47616057664b9724e"
  };
  // Initialize Firebase
firebase.initializeApp(myFirebaseConfig);
var database = firebase.database()
export default {
  name: 'Home',
  components: {
    MyNavbar
  },
  data:()=>({
    vuefilms
  }),
  mounted(){
    database.ref('/films').on('value', snapshot => {
      snapshot.forEach((oneFilm) => {
        let myfilm = oneFilm.val();
        this.vuefilms.push(myfilm)
      })
    });
  },
  beforeDestroy(){
    this.vuefilms = []
  }
}
</script>
