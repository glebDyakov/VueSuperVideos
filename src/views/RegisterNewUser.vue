<template>
  <div class="user">
    <MyNavbar />
    
    <form @submit.prevent class="form-signin text-center">
      <img class="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required="">
      <label for="inputEmail" class="sr-only">gender</label>
      <input v-model="gender" type="text" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
      <label for="inputEmail" class="sr-only">hobby</label>
      <input v-model="hobby" type="text" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
      <label for="inputEmail" class="sr-only">id</label>
      <input v-model="id" type="number" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
      <label for="inputEmail" class="sr-only">name</label>
      <input v-model="name" type="text" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
      <label for="inputEmail" class="sr-only">age</label>
      <input v-model="age" type="number" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
      <div class="checkbox mb-3">
      </div>
      <button class="btn btn-lg btn-primary btn-block" @click="addNewUser()">Sign in</button>
      
      <p class="mt-5 mb-3 text-muted">© 2017-2018</p> 

    </form>

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

const vueusers = [];
let database = firebase.database()

export default {
  name: 'RegisterNewUser',
  components: {
    MyNavbar
  },
  data:()=>({
    countOfUsers:0,
    name:'',
    email:'',
    password:'',
    hobby:'',
    age:0,
    id:0,
    gender:'',
    userId:0
  }),
  methods:{
    addNewUser(){
      this.userId = this.countOfUsers
      console.log('register')
      database.ref(`/users/${'user' + this.name}`).set({
        name:this.name,
        email:this.email,
        password:this.password,
        age:this.age,
        id:this.userId + 1,
        gender:this.gender,
        hobby:this.hobby,
      })
    }
  },
  mounted(){
    console.log(this.countOfUsers)
    database.ref('/users').on('value', snapshot => {
    snapshot.forEach((oneUser) => {
      this.countOfUsers += 1
      console.log(oneUser.val())
      console.log(this.countOfUsers)
    })
    console.log(this.countOfUsers)
    })
  },
  beforeDestroy(){
    this.countOfUsers = 0
    this.userId = 0
  }
}
</script>
<style scoped>

</style>