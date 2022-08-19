import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
    Box,
    Button,
    Center,
    Input,
    VStack, FormControl, Heading, Image, Pressable, View
} from "native-base";
import {useDispatch} from "react-redux";
import {loginUser} from "../redux/data/user";

const LoginPage = () => {
    const dispatch = useDispatch()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event: any) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    }

    const submitForm = () => {
        console.log(username, password); //todo: Debug entfernen
        // @ts-ignore
        dispatch(loginUser(username, password));
    }

    return <View style={{justifyContent: 'center', flex: 1, backgroundColor: '#fff'}}>
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
    </View>;
};


const style = StyleSheet.create({
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
