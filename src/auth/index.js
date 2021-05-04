import store from '../store/index'
import firebase from 'firebase'

export default {
    loginWithGoogle(){
        return new Promise((resolve, reject) => {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then((data) => {

                store.commit("SET_LOGGED_IN",true)
                store.commit("SET_USER",data.user)

                resolve({
                    message:"Giriş İşlemi Başarılı",
                    data:data.user
                })


            }).catch((err) => {

                reject(err)

            });
        })

    },
    loginWithEmail(email,password){
        return new Promise((resolve, reject) => {
            firebase
                .auth()
                .signInWithEmailAndPassword(email,password)
                .then(data => {

                    store.commit("SET_LOGGED_IN", true)
                    store.commit("SET_USER", data.user)
                    resolve({
                        message:"Giriş İşlemi Başarılı",
                        data:data.user
                    })
                })
                .catch(err => {

                    reject(err)
                });
        })
    },
    signUpWithEmail(email,password,name){
        return new Promise((resolve, reject) => {
            firebase.auth()
                .createUserWithEmailAndPassword(email, password)
                .then(data => {
                    data.user.sendEmailVerification()

                    data.user.updateProfile({
                        displayName: name,
                        photoURL: "http://mymbs.co.id/public/upload/image/user/user.png"
                    })
                        .then(() => {
                        });


                    store.commit("SET_LOGGED_IN", true)
                    store.commit("SET_USER", data.user)
                    resolve({
                        message:"Kayıt İşlemi Başarılı",
                        data:data.user
                    })
                })
                .catch(err => {
                   reject(err)
                });
        })
    },
    resetPassword(email){
        return new Promise((resolve, reject) => {

            firebase
                .auth()
                .sendPasswordResetEmail(email)
                .then(() => {
                    resolve({
                        message: "Şifre Sıfırlama Linki Mail Adresinize Gönderildi",

                    })
                })
                .catch(error => {
                    reject(err)
                });
        })
    },
    logout(){
        return new Promise((resolve, reject) => {
            firebase.auth().signOut().then(() => {
                resolve({
                    message: "Başarıyla Çıkış Yaptınız",

                })
                store.commit("SET_LOGGED_IN", false)
                store.commit("SET_USER", null)
            }).catch(err => {
                reject(err)
            })
        })
    },
    isAuthanticated(){
       return store.getters.isAuthanticated
    },
    getUserInfo(){
       return store.getters.getUserInfo
    }
}
