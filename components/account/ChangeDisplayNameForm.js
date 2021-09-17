
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { isEmpty } from 'lodash'
import { updateProfile } from '../../Utils/actions'

export default function ChangeDisplayNameForm({displayName,setShowModal, toastRef,setReloadUser}) {

    const [newDisplayName, setNewDisplayName] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const onSubmit = async ()=>{
        if(!validateForm()){
            return
        }
        setLoading(true)
        const result = await updateProfile({displayName: newDisplayName})
        setLoading(false)
        
        if(!result.statusResponse)
        {
            setError("Error al actulizar nombres y apellidos, intenta nuevamente")
            return
        }
        setReloadUser(true)
        toastRef.current.show("Actualizacion con exito",3000)
        setShowModal(false)

    }
    const validateForm = () =>{
        setError(null)

        if(isEmpty(newDisplayName)){
            setError("Debes ingresar nombre y apellidos")
            return false
        }
        if(newDisplayName === displayName){
            setError("No puede ser el mismo nombre actual")
            return false
        }
        return true
    }
    return (
        <View style={styles.view}>
            <Input
                placeholder="Ingresa nombre y apellidos"
                containerStyle={styles.input}
                defaultValue={displayName}
                onChange={(e)=>setNewDisplayName(e.nativeEvent.text)}
                errorMessage={error}
                rightIcon={{
                    type:"material-community",
                    name:"account-circle-outline",
                    color:"#c2c2c2"
                }}
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
    }
})
