<template>
  <div class="home">
    <div class="myfilms">
        <div class="card" style="width: 18rem;" :key="film" v-for="film of vuefilms">
          <div class="card-body">
            <h5 class="card-title">Название фильма: {{ film.name }}</h5>
            <h5 class="card-title">Режиссёр: {{ film.director }}</h5>
            <h5 class="card-title">Дата: {{ film.date }}</h5>
            <h5 class="card-title">Просмотры: {{ film.views }}</h5>
            <h5 class="card-title">Популярность: {{ film.popularity }}</h5>
            <p class="card-text">Описание: {{ film.description }}.</p>
            <a :href="'/' + film.url" class="btn btn-primary">Play Video</a>
              <video width="400" height="300" controls="controls">
                <source :src="film.url">
              </video>
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
const vuefilms = [];
var firebaseConfig = {
      apiKey: "AIzaSyAs2iNICjyyGgXQvtRTtYt67712RCcFOVs",
      authDomain: "listoffilms-8536f.firebaseapp.com",
      databaseURL: "https://listoffilms-8536f-default-rtdb.firebaseio.com",
      projectId: "listoffilms-8536f",
      storageBucket: "listoffilms-8536f.appspot.com",
      messagingSenderId: "595539552049",
      appId: "1:595539552049:web:1ba327027936ede9ff3210"
    };
  firebase.initializeApp(firebaseConfig);
  let database = firebase.database()
    database.ref('/').once('value')
    .then(async function(snapshot) {
      var films = snapshot.toJSON()
      var listOfFilms = await films.films
    })
export default {
  name: 'Home',
  components: {
    
  },
  data:()=>({
    vuefilms
  }),
  mounted(){
    database.ref('/films').on('value', snapshot => {
      console.log('User data: ', snapshot.val());
      snapshot.forEach((oneFilm) => {
        let myfilm = oneFilm.val();
        this.vuefilms.push(myfilm)
        console.log(myfilm)
      })
    });
  }
}
</script>
