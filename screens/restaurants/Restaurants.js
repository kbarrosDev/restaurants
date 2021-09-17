import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'

import Loading from '../../components/Loading'
import firebase from 'firebase/app'

export default function Restaurants({navigation}) {

    const [user, setUser] = useState(null)

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) =>{
            user ? setUser(true) : setUser (false)
        } )
        
    }, [])

    if(user === null)
    {
        return <Loading isVisible={true} text="Cargando..." />
    }

    return (
        <View style={styles.viewBody}>
            <Text>Restauranst...</Text>

            {
                user && (
                <Icon
                    type="material-community"
                    name="plus"
                    color="#442484"
                    reverse
                    containerStyle={styles.btncontainer}
                    onPress={()=> navigation.navigate("add-restaurant")}
                />
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex:1
    },
    btncontainer:{
        position:"absolute",
        bottom:10,
        right:10,
        shadowColor:"black",
        shadowOffset: {width:2, height:2},
        shadowOpacity:0.5


    }
})
