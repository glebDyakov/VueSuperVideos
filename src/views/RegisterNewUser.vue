<template>
  <div class="user">
    <MyNavbar />
    
    <form @submit.prevent class="form-signin text-center">
      <img class="mb-4" src="https://cdn4.iconfinder.com/data/icons/logos-brands-5/24/vue-dot-js-256.png" alt="" width="72" height="72">
      <h1 class="h3 mb-3 font-weight-normal">Зарегестрируйтесь</h1>
      <label for="inputEmail" class="sr-only">Photo</label>
      <input v-model="photo" type="text" id="inputEmail" class="form-control" placeholder="Photo" required="" autofocus="">
      <label for="inputEmail" class="sr-only">Email</label>
      <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required="">
      <label for="inputEmail" class="sr-only">Gender</label>
      <input v-model="gender" type="text" id="inputEmail" class="form-control" placeholder="Gender" required="" autofocus="">
      <label for="inputEmail" class="sr-only">Hobby</label>
      <input v-model="hobby" type="text" id="inputEmail" class="form-control" placeholder="Hobby" required="" autofocus="">
      <!--
      <label for="inputEmail" class="sr-only">Id</label>
      <input v-model="id" type="number" id="inputEmail" class="form-control" placeholder="Id" required="" autofocus="">
      -->
      <label for="inputEmail" class="sr-only">Name</label>
      <input v-model="name" type="text" id="inputEmail" class="form-control" placeholder="Name" required="" autofocus="">
      <label for="inputEmail" class="sr-only">Age</label>
      <input v-model="age" type="number" id="inputEmail" class="form-control" placeholder="Age" required="" autofocus="">
      <div class="checkbox mb-3">
      </div>
      <button class="btn btn-lg btn-primary btn-block" @click="addNewUser()">Зарегестрироваться</button>
      
      <MyFooter/>

    </form>

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

const vueusers = [];
let database = firebase.database()

export default {
  name: 'RegisterNewUser',
  components: {
    MyNavbar,
    MyFooter
  },
  data:()=>({
    countOfUsers:0,
    photo:'https://pbs.twimg.com/media/EcZzOJbXgAEpndc.jpg',
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
      M.toast({html: 'Новый пользователь зарегестрирован!'})
      this.userId = this.countOfUsers
      console.log('register')
      database.ref(`/users/${'user' + this.name}`).set({
        photo:this.photo,
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