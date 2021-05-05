import store from '../store/index'
import firebase from 'firebase'

export default {
    authControl(){
        if (localStorage.login == true){
            let data = {
                uid : localStorage.uid,
                displayName:localStorage.displayName,
                email:localStorage.email,
                emailVerified:localStorage.emailVerified,
                photoURL:localStorage.photoURL,
            }
            store.commit("SET_LOGGED_IN",true)
            store.commit("SET_USER",data)
        }
    },
    loginWithGoogle(){
        return new Promise((resolve, reject) => {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then((data) => {
                
                localStorage.uid = data.user.uid
                localStorage.login=true,
                localStorage.displayName=data.user.displayName
                localStorage.email=data.user.email
                localStorage.emailVerified=data.user.emailVerified
                localStorage.photoURL=data.user.photoURL
                

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
                    localStorage.login=true,
                    localStorage.uid = data.user.uid
                    localStorage.displayName=data.user.displayName
                    localStorage.email=data.user.email
                    localStorage.emailVerified=data.user.emailVerified
                    localStorage.photoURL=data.user.photoURL
                
    
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
                        localStorage.uid = data.user.uid
                        localStorage.displayName=data.user.displayName
                        localStorage.email=data.user.email
                        localStorage.emailVerified=data.user.emailVerified
                        localStorage.photoURL=data.user.photoURL
                        localStorage.login=true,
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
                localStorage.clear()
            }).catch(err => {
                reject(err)
            })
        })
    },
    isAuthanticated(){
        if(localStorage.login){
            return true
        }else{
            return false
        }
    },
    getUserInfo(){
       if(localStorage.login){
        return {
            login:localStorage.login,
            uid : localStorage.uid,
            displayName:localStorage.displayName,
            email:localStorage.email,
            emailVerified:localStorage.emailVerified,
            photoURL:localStorage.photoURL,
        }
       }else{
           return {}
       }
    }
}
