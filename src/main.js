import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import store from './store'
import './style/global.css'
import firebase from 'firebase'
let firebaseConfig = {
    apiKey: "AIzaSyDFoE4fmsoi8RD2k97pgyWnk7a2XBChN18",
    authDomain: "vue-js-api-588ee.firebaseapp.com",
    databaseURL: "https://vue-js-api-588ee-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "vue-js-api-588ee",
    storageBucket: "vue-js-api-588ee.appspot.com",
    messagingSenderId: "222637972414",
    appId: "1:222637972414:web:4dfb2873ed36f6023677ef",
    measurementId: "G-PSQ51VEPWH"
};
firebase.initializeApp(firebaseConfig);

createApp(App).use(store).use(router).mount('#app')
