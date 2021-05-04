import { createStore } from 'vuex'
import firebase from 'firebase'
import swal from 'sweetalert';

import router from "../router";
export default createStore({
  state: {
    user:{},
    isLogged:false
  },
  mutations: {
    SET_LOGGED_IN(state,value){
    state.isLogged = value
    },
    SET_USER(state,value){
      state.user = value
    }
  },
  getters:{
      isAuthanticated : state => {
          return state.isLogged
      },
      getUserInfo : state => {
          return (state.isLogged == true) ? state.user : {}
      },

  }
})
