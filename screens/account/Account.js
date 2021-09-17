import React, {useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text } from 'react-native'
import Loading from '../../components/Loading'
import { getCurrentUser, isUserLogged } from '../../Utils/actions'
import UserGuest from './UserGuest'
import UserLogged from './UserLogged'
import { useFocusEffect } from '@react-navigation/native'

export default function Account() {

    const [login, setLogin] = useState(null)
    
    // useEffect(() => {
    //     const user = isUserLogged()
    //    user !== null ? setLogin(true) : setLogin (false)
    // }, [])

    useFocusEffect(
        useCallback(() => {
            const user = getCurrentUser()
            user ? setLogin(true) : setLogin (false)
            //setLogin(isUserLogged())
            // const user = getCurrentUser()
            // user ? setLogin(true) : setLogin(false)
        }, []) 
    )

       
    
    if(login == null) {
          
       return <Loading isVisible={true} text="Cargando..."/>
    }
    
    return login ? <UserLogged/> : <UserGuest/>
    

   
}

const styles = StyleSheet.create({})
