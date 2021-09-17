import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native'
import { Input, Button, Icon, Avatar } from 'react-native-elements'
import  CountryPicker  from 'react-native-country-picker-modal'
import { map,size, filter } from 'lodash'
import {loadImageFromGallery} from '../../Utils/helpers'

export default function AddRestaurantForms({toastRef, setLoading, navigation}) {

    const [formData, setFormData] = useState(defaultFormValues())
    const [errorName, setErrorName] = useState(null)
    const [errorDescripcion, setErrorDescripcion] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorAddress, setErrorAddress] = useState(null)
    const [errorPhone, setErrorPhone] = useState(null)
    const [imagesSelect, setImagesSelect] = useState([])
    
    

    const addRestaurant = () =>{
        console.log(formData)
        console.log("Ok al crear restaurante")
    }

    return (
        <View style={styles.viewContainer}>
            <FormAdd
                formData={formData}
                setFormData={setFormData}
                errorName={errorName}
                errorDescripcion={errorDescripcion}
                errorEmail={errorEmail}
                errorAddress={errorAddress}
                errorPhone={errorPhone}
                
            />
            <UploadImage
                toastRef={toastRef}
                imagesSelect={imagesSelect}
                setImagesSelect={setImagesSelect}
            />
            <Button
                title="Crear Restaurante"
                onPress={addRestaurant}
                buttonStyle={styles.btnaddrestaurant}
            />
        </View>
    )
}

function FormAdd({formData, setFormData, errorName,errorDescripcion,errorEmail,errorAddress,errorPhone}){
    const [country, setCountry] = useState("CO")
    const [callingCode, setCallingCode] = useState("57")
    const [phone, setPhone] = useState("")

    const onChange = (e, type) => {
        setFormData({...formData, [type]: e.nativeEvent.text})
    }

    return (
        <View style={styles.viewForm}>
            <Input
                placeholder="Nombre del restaurante..."
                defaultValue={formData.name}
                onChange={(e)=> onChange(e,"name")}
                errorMessage={errorName}
            />
            <Input
                placeholder="Dirección del restaurante..."
                defaultValue={formData.address}
                onChange={(e)=> onChange(e,"address")}
                errorMessage={errorAddress}
            />
            <Input
                keyboardType="email-address"
                placeholder="Email del restaurante..."
                defaultValue={formData.email}
                onChange={(e)=> onChange(e,"email")}
                errorMessage={errorEmail}
            />
            <View style={styles.phoneView}>
                <CountryPicker
                    withFlag
                    withCallingCode
                    withFilter
                    withCallingCodeButton
                    containerButtonStyle={styles.countrypicker}
                    countryCode={country}
                    onSelect={(country) => {
                        setFormData({
                            ...formData, 
                            "country": country.cca2, 
                            "callingCode": country.callingCode[0]})
                        setCountry(country.cca2)
                        setCallingCode(country.callingCode[0])
                    }}
                />
                <Input
                    placeholder="Teléfono del restaurante..."
                    keyboardType="phone-pad"
                    containerStyle={styles.inputphone}
                    defaultValue={formData.phone}
                    onChange={(e)=> onChange(e,"phone")}
                    errorMessage={errorPhone}
                />
            </View>
                <Input
                    placeholder="Descripción del restaurante..."
                    multiline
                    containerStyle={styles.textarea}
                    defaultValue={formData.descripcion}
                    onChange={(e)=> onChange(e,"descripcion")}
                    errorMessage={errorDescripcion}
                />
        </View>
    )
}
function UploadImage({toastRef, imagesSelect, setImagesSelect}){
    const imageSelect = async() => {
        const response = await loadImageFromGallery([4, 3])
        if(!response.status){
            toastRef.current.show("No has seleccionado ninguna imagen.",3000)
            return
        }
        setImagesSelect([...imagesSelect, response.image])
    }
    const removeImage = (image) =>{
        Alert.alert(
            "Eliminar Imagen",
            "Estás seguro que quieres eliminar la imagen?",
            [
                {
                    text:"No",
                    style:"cansel"
                },
                {
                    text:"Si",
                    onPress: () => {
                        setImagesSelect(
                            filter(imagesSelect,(imageur) => imageur !== image )
                        )
                    }
                }
            ],
            {
                cancelable: true
            }
        )
    }
    return (
        <ScrollView
            horizontal
            style={styles.viewimages}
        >
            {
                size(imagesSelect) < 10 && (   
                    <Icon
                        type="material-community"
                        name="camera"
                        color="#7a7a7a"
                        containerStyle={styles.containerIcon}
                        onPress={imageSelect}
                    />
                )
            }
           {
               map(imagesSelect, (imageRestaurant, index) =>(
                   <Avatar
                       key={index}
                       style={styles.miniatureStyle}
                       source={{uri: imageRestaurant }}
                       onPress={()=> removeImage(imageRestaurant)}
                   />
               ))              
           } 
        </ScrollView>
    )
}
const defaultFormValues = () => {
    return {
        name: "",
        descripcion: "",
        email: "",
        phone: "",
        address: "",
        country: "CO",
        callingCode: "57"

    }
}

const styles = StyleSheet.create({
    viewContainer:{
        height:"100%"
    },
    viewForm:{
        marginHorizontal: 10
    },
    textarea:{
        height:100,
        width:"100%"
    },
    phoneView:{
        width:"80%",
        flexDirection:"row"
    },
    inputphone:{
        width: "80%"
        
    },
    btnaddrestaurant:{
        margin:20,
        backgroundColor: "#442484"
    },
    viewimages:{
        flexDirection:"row",
        marginHorizontal:20,
        marginTop:30
    },
    containerIcon:{
        alignItems:"center",
        justifyContent:"center",
        marginRight:10,
        height:70,
        width: 70,
        backgroundColor: "#e3e3e3"
    },
    miniatureStyle:{
        width: 70,
        height:70,
        marginRight:10
    }

})
