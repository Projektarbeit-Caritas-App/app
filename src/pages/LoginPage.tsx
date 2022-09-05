import React, {useState} from 'react';
import {Keyboard, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {
    Box,
    Button,
    Center,
    Input,
    VStack, FormControl, Heading, Image, Pressable, View, KeyboardAvoidingView, Text, Alert, Spinner, HStack
} from "native-base";
import {loginUser} from "../redux/data/api";
import {useDispatch} from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = React.useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const dispatch = useDispatch();

    const [error, setError] = useState({type: '', msg: ''});

    const handleUsernameChange = (value: any) => {
        setUsername(value);
    }

    const handlePasswordChange = (value: any) => {
        setPassword(value);
    }

    const submitForm = () => {
        setPageLoading(true);
        loginUser(username, password, dispatch).then((res: any) => {
            if (res !== true) {
                setError({type: 'error', msg: res})
            }
            setPageLoading(false);
        }).catch(err => {
            setError({type: 'warning', msg: err})
            setPageLoading(false);
        })
    }

    return <KeyboardAvoidingView behavior="padding" style={style.container}>
        <View style={{justifyContent: 'center', flex: 1, backgroundColor: '#fff'}}>
            <Center w="100%" style={style.centerBox}>
                <Box safeArea p="2" py="8" w="90%" maxW="500">
                    <Image source={require('../assets/caritas.gif')} alt={'Logo'} style={style.image}
                           resizeMode="contain"></Image>

                    <Center>
                        <Heading size="md" fontWeight="600" color="coolGray.800" _dark={{
                            color: "black"
                        }}>
                            Anmelden um fortzufahren
                        </Heading>
                    </Center>

                    {pageLoading ? (
                        <Center>
                            <HStack space={8} justifyContent="center" alignItems="center">
                                <Spinner size="lg" />
                            </HStack>;
                        </Center>
                    ) : (
                        <VStack space={3} mt="1">
                            {(error.type !== '') ? (<Alert w="100%" colorScheme={error.type} status={error.type}>
                                <Text>{error.msg}</Text>
                            </Alert>) : null}
                            <FormControl>
                                <FormControl.Label>E-Mail Adresse</FormControl.Label>
                                <Input value={username} keyboardType="email-address" textContentType={'emailAddress'}
                                       autoCapitalize='none' autoCorrect={false}
                                       onChangeText={value => handleUsernameChange(value)} placeholder={"E-Mail"}/>
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Passwort</FormControl.Label>
                                <Input type={show ? "text" : "password"}
                                       InputRightElement={<Icon name={show ? "visibility-off" : "visibility"} size={15}
                                                                style={style.visibilityButton}
                                                                onPress={() => setShow(!show)}/>} value={password}
                                       onChangeText={value => handlePasswordChange(value)} placeholder="Passwort"/>
                            </FormControl>
                            <Button mt="2" colorScheme="primary" onPress={submitForm}>
                                Anmelden
                            </Button>
                        </VStack>
                    )}
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
    },
    visibilityButton: {
        marginRight: 10
    }
});

export default LoginPage;
