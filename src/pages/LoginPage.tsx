import React, {useState} from 'react';
import {Keyboard, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {
    Box,
    Button,
    Center,
    Input,
    VStack, FormControl, Heading, Image, Pressable, View, KeyboardAvoidingView, Text, Alert
} from "native-base";
import {loginUser} from "../redux/data/api";
import {useDispatch} from "react-redux";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const [error, setError] = useState({type: '', msg: ''});

    const handleUsernameChange = (event: any) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    }

    const submitForm = () => {
        loginUser(username, password, dispatch).then((res: any) => {
            if (res !== true) {
                setError({type: 'error', msg: res})
            }
        }).catch(err => {
            setError({type: 'warning', msg: err})
        })
    }

    return <KeyboardAvoidingView behavior="padding" style={style.container}>
        <View style={{justifyContent: 'center', flex: 1, backgroundColor: '#fff'}}>
            <Center w="100%" style={style.centerBox}>
                <Box safeArea p="2" py="8" w="90%" maxW="500">
                    <Image source={require('../assets/caritas.gif')} alt={'Logo'} style={style.image}
                           resizeMode="contain"></Image>

                    <Heading size="md" fontWeight="600" color="coolGray.800" _dark={{
                        color: "black"
                    }}>
                        Anmelden um fortzufahren
                    </Heading>

                    <VStack space={3} mt="1">
                        {(error.type !== '') ? (<Alert w="100%" colorScheme={error.type} status={error.type}>
                            <Text>{error.msg}</Text>
                        </Alert>) : null}
                        <FormControl>
                            <FormControl.Label>E-Mail Adresse</FormControl.Label>
                            <Input value={username} onChange={handleUsernameChange}/>
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Passwort</FormControl.Label>
                            <Input type="password" value={password} onChange={handlePasswordChange}/>
                        </FormControl>
                        <Button mt="2" colorScheme="primary" onPress={submitForm}>
                            Anmelden
                        </Button>
                    </VStack>
                </Box>
            </Center>
        </View>
    </KeyboardAvoidingView>;
};


const style = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        width: '100%',
        marginBottom: 20
    },
    centerBox: {
        display: "flex",
        justifyContent: "center"
    }
});

export default LoginPage;
