import React, {useState} from 'react';
import {Image, Text, TextInput, View, StyleSheet, Dimensions, Pressable} from 'react-native';
import globals from "../layout/globals";
const {width} = Dimensions.get('screen');

const LoginPage = () => {
    const [username, setUsername] = useState('');

    return (
        <View>
            <Image source={require('../assets/lottie/plane.gif')} style={styles.lottie}></Image>
            <View style={[globals.centerChilds, styles.header]}>
                <View style={globals.container}>
                    <Text style={globals.headlineText}>Anmelden</Text>
                </View>
            </View>
            <View style={[globals.centerChilds, globals.spaceTop]}>
                <View style={globals.container}>
                    <Text style={globals.text}>Bitte geben Sie Ihre Benutzerdaten ein</Text>
                    <View style={globals.form}>
                        <TextInput placeholder={'Benutzername'} style={globals.input}></TextInput>
                        <TextInput placeholder={'Passwort'} secureTextEntry={true} style={globals.input}/>
                        <Pressable style={globals.button}>
                            <Text style={globals.buttonText}>Anmelden</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    lottie: {
        width: width,
        height: width
    },
    header:{
        marginTop: -50,
        backgroundColor: '#fff',
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        paddingTop: 15
    }
});

export default LoginPage;
