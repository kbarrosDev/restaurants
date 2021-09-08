import { firebaseApp } from './firebase'
import  firebase from 'firebase'
import 'firebase/firestore'

const db = firebase.firestore(firebaseApp)

export var isUserLogged = () => {
    let isLogged = false
    firebase.auth().onAuthStateChanged((user) => {
        user !== null ? (isLogged = false) : (isLogged = true)
    })
    
    return isLogged
}

export const getCurrentUser = () => {
    return firebase.auth().currentUser
    
}
