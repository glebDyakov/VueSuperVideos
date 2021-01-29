<template>

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">VueSuperVideos</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link active" aria-current="page" to="/">
                Домой
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" aria-current="page" to="/register">
                Зарегестрироваться
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" aria-current="page" to="/user">
                Войти
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</template>

<script>
export default {
  name: 'MyNavbar',
  props: {
      
  }
}
</script>
