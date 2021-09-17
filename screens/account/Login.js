import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import { Divider } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import LoginForm from '../../components/account/LoginForm'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function Login() {
    
    return (
        <KeyboardAwareScrollView>
            <Image
                source={require("../../assets/profile_sosafastfood.jpeg")}
                resizeMode = "contain"
                style={styles.image}
            />
            <View style={styles.container}>
                <LoginForm/>
                <CreateAccount/>
            </View>
            <Divider style={styles.divider}
            
            />
        </KeyboardAwareScrollView>
       
    )
}

function CreateAccount(props){
    const navigation = useNavigation()
    return (
        <Text 
            style={styles.register}
            onPress={() => navigation.navigate("register") }
        > 
            ¿Aún no tienes una cuenta?{" "}
            <Text style={styles.btnregister}>Regístrate</Text>
        </Text>
    )
}

const styles = StyleSheet.create({
    image: {
        marginTop:10,
        height:150,
        width:"100%",
        marginBottom: 20
    },
    container :{
        marginHorizontal:40
    },
    divider : {
        backgroundColor: '#be2f0c',
        margin: 40
    },
    register: {
        marginTop: 15,
        marginHorizontal: 10,
        alignSelf:"center"
    },
    btnregister: {
        color:"#be2f0c",
        fontWeight:"bold"
    }
})
