import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
    Box,
    Button,
    Center,
    Input,
    VStack, FormControl, Heading, Image, Pressable
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
        dispatch(loginUser(username, password));
    }

    return <Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
            <Image source={require('../assets/caritas.gif')} alt={'Logo'} style={style.image}></Image>

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
    </Center>;
};


const style = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        marginBottom: 20
    }
});

export default LoginPage;
