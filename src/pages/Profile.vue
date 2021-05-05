<template>
  <div>
    

    <!-- component -->
    <!-- eslint-disable -->

    <div class="bg-white my-12 pb-6 w-full justify-center items-center border border-gray-300 overflow-hidden md:max-w-sm rounded-lg shadow-sm mx-auto">
      <div class="relative h-40 opacity-40 border-b border-gray-300">
        <img class="absolute h-full w-full object-cover" src="https://images.unsplash.com/photo-1448932133140-b4045783ed9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80">
      </div>
      <div class="relative shadow mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4">
        <img class="object-cover w-full h-full"
             :src="veri.photoURL"
        >
      </div>
      <div class="mt-16">
        <h1 class="text-lg text-center font-semibold">
          {{veri.displayName}}
        </h1>
        <p class="text-sm text-gray-600 text-center">
          {{veri.email}}
        </p>
        <p v-if="veri.emailVerified == true" class="text-green-600 text-sm text-center">
Doğrulanmış Email
        </p>
        <p v-else class="text-red-600 text-sm text-center">
Doğrulanmamış Email
        </p>
       
      </div>

    </div>
  </div>
</template>

<script>

import auth from '../auth/index'
export default {
  name: "Profile",
  created(){
    if (auth.isAuthanticated() == false){
      this.$router.push("/login")
    }else{
      this.veri = auth.getUserInfo()
    }
  },
  data(){
    return{
      veri:null
    }
  }
}
</script>

