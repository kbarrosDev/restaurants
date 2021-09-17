import React from 'react'
import { ScrollView, Image, } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import Loading from '../../components/Loading'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'



export default function UserGuest() {
    const navigation = useNavigation()
    
    return (
        <ScrollView
            centerContent
            style={styles.viewBody}
        >
            <Image
                source={require("../../assets/profile_sosafastfood.jpeg")}
                resizeMode="contain"
                style={styles.image}
            />
            <Text style={styles.title}>Consulta tú perfil en SosaFastFood App</Text>
            <Text style={styles.descripcion}>
                ¿Cómo describirías tú experiencia con el mejor restaurante de comidas rápida en Santa Marta? Busca y vizualiza todo nuestro contenidos y promociones de manera sencilla y realiza tú pedido
            </Text>
            <Button
                buttonStyle={styles.boton}
                title="Ver tu perfil"
                onPress={() =>  navigation.navigate('login') }
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        marginHorizontal: 30
    },
    image: {
        height:300,
        width:"100%",
        marginBottom:10  
    },
    title: {
        fontWeight: 'bold',
        fontSize: 19,
        marginVertical: 10,
        textAlign: "center"
    },
    descripcion : {
        textAlign: "justify",
        marginBottom: 20,
        color: "#be2f0c"
    },
    boton: {
        backgroundColor: "#be2f0c"
    }

})
