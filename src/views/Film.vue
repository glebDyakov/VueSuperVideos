<template>
  <div class="film">
    <MyNavbar />
    <div class="mycenter">
      <video :poster="$route.query.poster" width="400" height="300" controls="controls">
        <source :src="$route.query.url">
        Видео недоступно по разрешению правообладателя.
      </video>
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
import {router} from '@/router/index';
export default {
  name: 'Film',
  components: {
    MyNavbar
  },
  mounted(){
      let database = firebase.database()
      database.ref(`/films/${this.$route.query.filmKey}/`).update({
        views:Number(this.$route.query.views) + 1
      })
    }
}
</script>
<style scoped>
  .mycenter {
    display:flex;
    justify-content: center;
  }
</style>