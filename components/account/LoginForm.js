import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Button, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { validateEmail } from '../../Utils/helpers'
import { isEmpty, size } from 'lodash'
import Loading from '../Loading'
import { loginWithEmailAndPassword } from '../../Utils/actions'

export default function LoginForm() {

    const [showPassword, setShowPassword] = useState(false)    
    const [formData, setFormData] = useState(defaultFormValues())
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()
    
    const onChange = (e, type) => {
        setFormData({...formData, [type]:e.nativeEvent.text})
        
    }
    const doLogin = async () => {
        if(!validateData()){
            return;
        }
        setLoading(true)
        const result = await loginWithEmailAndPassword(formData.email,formData.password)
        setLoading(false)
        if(!result.statusResponse){
            setErrorEmail(result.error)
            setErrorPassword(result.error)
            return
        }
        navigation.navigate("account")
    }
    // const doRegisterUser = async () => {
    //     if(!validateData()){
    //         return;
    //     }
    //     setLoading(true)
    //     const result = await registerUser(formData.email,formData.password)
    //     setLoading(false)
    //     if(!result.statusResponse){
    //         setErrorEmail(result.error)
    //         return
    //     }
    //     navigation.navigate("account")
    // }

    const validateData = () =>{
        
        setErrorEmail("")
        setErrorPassword("")
        let isValid = true
        if(!validateEmail(formData.email)){
            setErrorEmail("Debes ingresar un email válido.")
            isValid = false
        }
        if(isEmpty(formData.password)){
            setErrorPassword("Debes ingresar tú contraseña.")
            isValid = false
        }
        return isValid
    }

    return (
        <View style={styles.container}>
            <Input
                containerStyle={styles.input}
                placeholder="Ingresa tú email..."
                keyboardType="email-address"
                onChange={(e)=> onChange(e,"email") }
                errorMessage={errorEmail}
                defaultValue={formData.email}
            />
            <Input
                containerStyle={styles.input}
                placeholder="Ingresa tú contraseña..."
                password={true}
                secureTextEntry={!showPassword}
                onChange={(e)=> onChange(e,"password") }
                errorMessage={errorPassword}
                defaultValue={formData.password}
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
                title="Iniciar Sesión"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={()=> doLogin()}
            />
            <Loading isVisible={setLoading} text="Iniciando Sesión..." />
        </View>
    )
}
const defaultFormValues = () => {
    return {email: "", password: ""}
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        marginTop: 30
    },
    input: {
        width: "100%"
    },
    btnContainer:{
        marginTop: 20,
        width:"95%",
        alignSelf:"center"
    },
    btn:{
        backgroundColor:"#be2f0c"
    },
    icon:{
        color:"#c1c1c1"
    }

})
