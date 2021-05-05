<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton ref="buton" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex-shrink-0 flex items-center">
            <img class="block lg:hidden h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
            <img class="hidden lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg" alt="Workflow" />
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4 buyuk">
              <router-link  v-for="item in navigation" :key="item.name" :to="item.href" class="buyuk text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</router-link>
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <button class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button>

          <!-- Profile dropdown -->
          <Menu as="div" class="ml-3 relative">
            <div>
              <MenuButton class="bg-gray-800 p-1 flex rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span class="sr-only">Open user menu</span>
<div class="text-gray-400">
                <UserIcon v-show="login == false" class="text-gray-400 h-6 w-6 rounded-full" /> </div>
                <img v-show="login == true" :src="picture" alt="" class="h-6 w-6 rounded-full">
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100 active" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem v-show="login == true">
                  <router-link to="/profile" class="block px-4 py-2 text-sm text-gray-700 active" >Profiliniz</router-link>
                </MenuItem>
                <MenuItem v-show="login == true">
                  <a @click.prevent="logout()" class="block px-4 py-2 active text-sm text-gray-700">Çıkış Yap</a>
                </MenuItem>
                <MenuItem v-show="login == false" v-slot="{ active }">
                  <router-link to="/login" class="block px-4 py-2 active text-sm text-gray-700">Giriş Yap</router-link>
                </MenuItem>

              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 gucuk">
        <router-link v-for="item in navigation" :key="item.name" :to="item.href" class="gucuk text-gray-300  hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"  :aria-current="item.current ? 'page' : undefined">{{ item.name }}</router-link>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script>

import { ref } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { BellIcon, MenuIcon, XIcon, UserIcon } from '@heroicons/vue/outline'
import firebase from "../auth/index";
import swal from 'sweetalert'
export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    BellIcon,
    MenuIcon,
    XIcon,
    UserIcon
  },
  
  created() {

  this.login = firebase.isAuthanticated()
    let pict = firebase.getUserInfo()
    this.picture = pict.photoURL
  },
  data(){
    return{
      open : ref(false),
      login:false,
      picture:null,
      navigation : [
        { name: 'Anasayfa', href: '/'},
        { name: 'Hakkımda', href: '/about' },
      ]
    }
  },
  methods:{

    logout(){
      firebase.logout().then(res => {
        swal({
          text:res.message,
          icon:"success"
        }).then(val => {
          this.$router.push("/")
        })

        this.login = firebase.isAuthanticated()

      }).catch(err => {
        swal({
          text:err.message,
          icon:"error"
        })
      })
    },
    
  }

}
</script>
<style>

  .buyuk.router-link-active{
    @apply bg-gray-900 text-white
  }
  .active.router-link-active{
    @apply bg-gray-100 
  }
</style>