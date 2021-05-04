<template>
  <div class="about">
    <Menu path="/about" />
    Burası Hakkımda Sayfası
  </div>
</template>
<script>
import Menu from '../components/Menu'
import auth from '../auth/index'
export default {
  components:{
    Menu
  },
  data(){
    return{
      data:auth.getUserInfo()
    }
  }
}
</script>