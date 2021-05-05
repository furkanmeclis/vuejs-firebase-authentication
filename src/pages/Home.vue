<template>
  <div>
    
   Burası Anasayfa
  </div>
</template>
<script>

import auth from '../auth/index'
export default {
  
  methods:{
    getUser(){
     console.log( auth.getUserInfo())
    }
  }
}
</script>
