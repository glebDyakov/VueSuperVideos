<template>
  <div class="film">
    <MyNavbar />
    <div class="mycenter">
      <video :poster="film.poster" width="400" height="300" controls="controls">
        <source :src="$route.query.url">
        Видео недоступно по разрешению правообладателя.
      </video>
    </div>
  </div>
</template>

<script>
import MyNavbar from '@/components/MyNavbar.vue';
export default {
  name: 'Film',
  components: {
    MyNavbar
  }
}
</script>
<style scoped>
  .mycenter {
    display:flex;
    justify-content: center;
  }
</style>