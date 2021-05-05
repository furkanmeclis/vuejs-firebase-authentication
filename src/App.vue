<template>
   <div>
     <Menu />
     <router-view/>
   </div>

</template>
<script>
import Menu from './components/Menu'
import auth from './auth/index'
export default {
  beforeCreate() {
    auth.authControl()

  },
  components:{
    Menu
  }
}
</script>