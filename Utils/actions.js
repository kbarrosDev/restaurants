import { firebaseApp } from './firebase'
import  firebase from 'firebase'
import 'firebase/firestore'
import { fileToBlob } from './helpers'

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
export const closeSession = () => {
    return firebase.auth().signOut()
    
}

export const registerUser = async(email,password) => {
    const result = { statusResponse: true, error: null }
    try {
        await firebase.auth().createUserWithEmailAndPassword(email,password)
    } catch (error) {
        result.statusResponse = false
        result.error = "Este correo ya existe."
    }
    return result
}
export const loginWithEmailAndPassword = async(email,password) => {
    const result = { statusResponse: true, error: null }
    try {
        await firebase.auth().signInWithEmailAndPassword(email,password)
    } catch (error) {
        result.statusResponse = false
        result.error = "Los datos ingresados no son correctos."
    }
    return result
}
export const uploadImage = async (image, path, name)=>{
    const result = {statusResponse:false, error:null, url:null }
    const ref = firebase.storage().ref(path).child(name)
    const blob = await fileToBlob(image)

    try {
        await ref.put(blob)
        const url = await firebase.storage().ref(`${path}/${name}`).getDownloadURL()
        result.statusResponse = true
        result.url = url
    } catch (error) {
        result.error = error
    }
    return result
}
export const updateProfile = async(data) => {
    const result = {statusResponse: true, error:null}
    try {
        await firebase.auth().currentUser.updateProfile(data)
    } catch (error) {
        result.statusResponse = false
        result.error = error    
    }
    return result
}
 