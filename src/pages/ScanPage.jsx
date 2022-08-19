import React, {useEffect, useState} from 'react';
import {Button, Keyboard, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View} from 'react-native';
import {Box, Center, KeyboardAvoidingView, VStack} from "native-base";
import {BarCodeScanner} from 'expo-barcode-scanner';
import Icon from "react-native-vector-icons/FontAwesome";
import {getCardByID} from "../redux/data/api";
import {useSelector} from "react-redux";

const ScanPage = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [userid, setUserid] = useState('49394739894111');
    const state = useSelector((state) => state);

    useEffect(() => {
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, [hasPermission, scanned]);

    useEffect(() => {
        if (userid !== undefined && userid.length === 14) {
            handleQrEntered();
        }
    },[userid])

    const handleQrEntered = () => {
        console.log('userid', userid); //todo: Debug entfernen
        if (userid !== undefined && userid.length === 14) {
            const config = {
                headers: { Authorization: `Bearer ${state.userReducer.token}` }
            };

            getCardByID(parseInt(userid), config).then(res => {
                console.log('res', res); //todo: Debug entfernen
            })
        } else {
            alert("Fehler beim Lesen des QR Codes. Bitte versuchen Sie es erneut.")
        }
    }

    const handleBarCodeScanned = ({data}) => {
        setScanned(true);
        setUserid(data);
    };
    if (hasPermission === null) {
        return <Text>Bitte geben Sie der App Zugriff auf die Kamera. Diese wird ausschließlich benutzt, um QR Codes zu
            erkennen.</Text>;
    }
    if (hasPermission === false) {
        return <Text>Kein Zugriff auf die Kamera. Bitte erlauben Sie diesen in den Systemeinstellungen.</Text>;
    }

    const handleUserIdChange = (e) => {
        setUserid(e.target.value);
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={style.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{justifyContent: 'flex-start', flex: 1, backgroundColor: '#fff'}}>
                    <Center w="100%">
                        <Box safeArea px="2" py={0} w="90%" maxW="500">
                            <VStack space={3} mt="1">
                                <View style={style.codeScanner}>
                                    <BarCodeScanner
                                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                                        style={StyleSheet.absoluteFillObject}
                                    />
                                    {scanned &&
                                        <Button title="Nochmal scannen" onPress={() => setScanned(false)}></Button>}
                                </View>
                            </VStack>
                            <VStack space={3} mt={1}>
                                <View style={style.innerInput}>
                                    <TextInput placeholder={"Nummer eingeben..."} value={userid}
                                               onChange={handleUserIdChange} style={style.innerInputInput}/>
                                    <Pressable colorScheme="primary" style={style.innerInputIcon}
                                               onPress={handleQrEntered}>
                                        <Icon name={"play"}/>
                                    </Pressable>
                                </View>
                            </VStack>
                        </Box>
                    </Center>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

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
    codeScanner: {
        minHeight: 300,
        width: '100%'
    },
    innerInput: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        marginTop: 10
    },
    innerInputInput: {
        flex: 1,
        padding: 5
    },
    innerInputIcon: {
        backgroundColor: '#9a3e3e',
        paddingHorizontal: 10,
        paddingVertical: 5
    }
});
export default ScanPage;
