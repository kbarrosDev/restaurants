import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Button, Icon } from 'react-native-elements'
import { isEmpty } from 'lodash'
import { updateProfile } from '../../Utils/actions'
import { validateEmail } from '../../Utils/helpers'

export default function ChangeEmailForm({email,setShowModal, toastRef,setReloadUser}) {

    const [newEmail, setNewEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorPassword, setErrorPassword] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmit = async ()=>{
        if(!validateForm()){
            return
        }
        // setLoading(true)
        // const result = await updateProfile({displayName: newDisplayName})
        // setLoading(false)
        
        // if(!result.statusResponse)
        // {
        //     setError("Error al actulizar nombres y apellidos, intenta nuevamente")
        //     return
        // }
        // setReloadUser(true)
        // toastRef.current.show("Actualizacion con exito",3000)
        // setShowModal(false)

    }
    const validateForm = () =>{

        setErrorEmail(null)
        setErrorPassword(null)
        let isValid = true

        console.log(newEmail)

        if(!validateEmail(newEmail)){
            setErrorEmail("Debes ingresar un email válido.")
            isValid = false
        }
        if(newEmail === email){
            setErrorEmail("Debes ingresar un email diferente")
            isValid = false
        }
        if(isEmpty(password)){
            setErrorPassword("Debes ingresar tú contraseña.")
            isValid = false
        }

        return isValid
    }
    return (
        <View style={styles.view}>
            <Input
                placeholder="Ingresa nuevo Email..."
                containerStyle={styles.input}
                defaultValue={email}
                keyboardType="email-address"
                onChange={(e)=>setNewEmail(e.nativeEvent.text)}
                errorMessage={errorEmail}
                rightIcon={{
                    type:"material-community",
                    name:"at",
                    color:"#c2c2c2"
                }}
            />
            <Input
                placeholder="Ingresa tú contraseña..."
                containerStyle={styles.input}
                defaultValue={password}
                onChange={(e)=>setPassword(e.nativeEvent.text)}
                errorMessage={errorPassword}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={ showPassword ? "eye-outline" : "eye-off-outline" }
                        iconStyle={styles.icon}
                        onPress={()=>setShowPassword(!showPassword)}
                    />
                }
            />
            <Button
                title="Modificar"
                containerStyle={styles.btncontainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading = {loading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems:"center",
        paddingVertical: 10
    },
    input: {
        marginBottom: 10
    },
    btncontainer: {
        width:"95%",
    },
    btn:{
        backgroundColor:"#442494"
    },
    icon:{
        color:"#c1c1c1"
    }
})

