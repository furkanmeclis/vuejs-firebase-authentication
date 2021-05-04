<template>
      <div>
        <Menu path="/login" />
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
          <div class="mb-1 text-white bg-red-500 py-2 px-4 rounded-2xl" v-show="hata != false">
            {{ hata }}
            </div>
          <form @submit.prevent="login()">
            <div v-show="reset == false">
              <div class="mb-4" v-show="isUser == false">
                <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
                  Adınız Soyadınız
                </label>
                <input v-model="user.name" @keypress="hata = false" class="shadow appearance-none border-2 rounded w-full py-2 px-3 text-grey-darker focus:outline-none  focus:ring-indigo-500 focus:border-indigo-500" id="username2" type="text">
              </div>
              <div class="mb-4">
            <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
              Email Adresiniz
            </label>
            <input v-model="user.email"  @keypress="hata = false" class="shadow appearance-none border-2 rounded w-full py-2 px-3 text-grey-darker focus:outline-none  focus:ring-indigo-500 focus:border-indigo-500" id="username" type="email">
          </div>
              <div class="mb-6">
            <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
              Şifreniz
            </label>
            <input  @keypress="hata = false" v-model="user.password" class="shadow appearance-none border-2 rounded w-full py-2 px-3 text-grey-darker mb-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" id="password" type="password">
            <a @click.prevent="isUser = !isUser ; hata = false"  class="select-none bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 cursor-pointer rounded focus:outline-none ">  {{ (isUser) ? "Üye Değilmisiniz ?" : "Zaten Üyemisiniz ?"}}</a>
          </div>
              <div class="flex items-center">
              <button
                  class=" disabled:opacity-50 font-bold py-2 px-4 rounded focus:outline-none "
                  type="submit"
                  :disabled="loading == true"
                  :class="{'bg-blue-500 hover:bg-blue-700 text-white' : isUser,'bg-yellow-500 hover:bg-yellow-700 text-black' : !isUser}"
              >
                {{ (isUser) ? "Giriş Yap" : "Kayıt Ol"}}

              </button>
              <button @click.prevent="loginWithGoogle()" class="bg-green-500 hover:bg-green-700  ml-2 text-white font-bold py-2 px-4 rounded focus:outline-none " type="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
                  <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                </svg>
              </button>
            </div>
            </div>
          </form>
          <form @submit.prevent="resetPassword()" >
            <div  v-show="reset == true">
            <div class="mb-4">
              <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
                Email Adresiniz
              </label>
              <input v-model="resemail"  @keypress="hata = false" class="shadow appearance-none border-2 rounded w-full py-2 px-3 text-grey-darker focus:outline-none  focus:ring-indigo-500 focus:border-indigo-500" type="email">
            </div>
              <div class="flex items-center">
                <button
                    class="disabled:opacity-50 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none "
                    type="submit"
                    :disabled="loading == true"
                     >
                 Şifremi Sıfırla

                </button>
              </div>
        </div>
          </form>
          <p>
            <a @click="change()" class="md:float-right sm:float-left inline-block cursor-pointer align-baseline font-bold text-sm text-blue hover:text-red-600">
              {{ (reset) ? 'Şifrenizi Hatırlıyormusunuz ?' : 'Şifrenizimi Unuttunuz ?'}}
            </a>
          </p>

        </div>
      </div>
</template>
<script>
import Menu from '../components/Menu'
import auth from '../auth/index'
export default {
  created() {
     let au = auth.isAuthanticated()
    if (au == true){
      this.$router.push("/")
    }
    },
  components:{
    Menu
  },
  data(){
    return{
      isUser:true,
      hata:false,
      loading:false,
      reset:false,
      resemail:"",
      user:{
        email:"",
        password:"",
        name:""
      }
    }
  },
  methods:{
    login(){
      if (this.isUser == true){
        if (this.user.email == "" || this.user.password == ""){
          this.hata = "Lütfen Gerekli Alanları Doldurun"
        }else{
          this.loading = true
          this.loginWithEmail()
        }
      }else{
        if (this.user.email == "" || this.user.password == "" || this.user.name == ""){
          this.hata = "Lütfen Gerekli Alanları Doldurun"
        }else{
          this.loading = true
          this.signUpWithEmail()
        }
      }

    },
    loginWithGoogle(){
      auth.loginWithGoogle().then(res => {
        this.loading = false
        swal({
          title:"Hoşgeldiniz "+res.data.displayName,
          text:res.message,
          icon:"success",
          button:"Tamam"
        }).then(val => {
          this.$router.push("/")
        })
      }).catch(err => {
        this.loading = false
        swal({
          title:"Hata",
          text:err.message,
          icon:"error"
        })
      })
    },
    loginWithEmail(){
      auth.loginWithEmail(this.user.email,this.user.password).then(res => {
        this.loading = false
        swal({
          title:"Hoşgeldiniz "+res.data.displayName,
          text:res.message,
          icon:"success",
          button:"Tamam"
        }).then(val => {
          this.$router.push("/")
        })
      }).catch(err => {
        this.loading = false
        swal({
          title:"Hata",
          text:err.message,
          icon:"error"
        })
      })
    },
    signUpWithEmail(){
      auth.signUpWithEmail(this.user.email,this.user.password,this.user.name).then(res => {
        swal({
          title:"Hoşgeldiniz "+this.user.name,
          text:res.message,
          icon:"success",
          button:"Tamam"
        }).then(val => {
          this.$router.push("/")
        })
        this.loading = false
      }).catch(err => {
        this.loading = false
        swal({
          title:"Hata",
          text:err.message,
          icon:"error"
        })
      })
    },
    resetPassword(){
      if (this.resemail == ""){
        this.hata = "Lütfen Email Adresinizi Giriniz"
      }else{
        this.loading = true
        auth.resetPassword(this.resemail).then(res => {
          this.loading = false
          swal({
            text:res.message,
            icon:"success"
          })

          this.reset = false
        }).catch(err => {
          this.loading = false
          swal({
            text:err.message,
            icon:"error"
          })
        })
      }
    },
    change(){
      this.reset = !this.reset
    }
  }
}
</script>