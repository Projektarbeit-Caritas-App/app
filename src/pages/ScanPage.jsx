import React, {useEffect, useState} from 'react';
import {Button, Keyboard, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View} from 'react-native';
import {Alert, Box, Center, KeyboardAvoidingView, VStack} from "native-base";
import {BarCodeScanner} from 'expo-barcode-scanner';
import Icon from "react-native-vector-icons/FontAwesome";
import {getCardByID} from "../redux/data/api";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import ReservationList from "../components/ReservationList";

const ScanPage = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const tempID = '50080528753334'; //todo: Remove debug
    const [cardId, setCardId] = useState('');
    const state = useSelector(({persistantReducer}) => persistantReducer);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    //todo: solve 429 too many requests on schedule

    useEffect(() => {
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, [hasPermission, scanned]);

    useEffect(() => {
        if (cardId !== undefined && cardId.length === 14) {
            handleQrEntered();
        }
    }, [cardId])

    const handleQrEntered = () => {
        if (cardId !== undefined && (cardId.length >= 14 && cardId.length <= 16)) {
            const config = {
                headers: {Authorization: `Bearer ${state.token}`}
            };

            getCardByID(parseInt(cardId), config, dispatch).then(res => {
                if (res.persons !== undefined) {

                    navigation.navigate('CardPage', {data: res})
                }
            }).catch(() => {
                alert("Der eingegebene oder gescannte QR Code konnte keinem Benutzer zugeordnet werden. Bitte überprüfen Sie Ihre Eingabe.")
            })
        } else {
            alert("Fehler beim Lesen des QR Codes. Bitte versuchen Sie es erneut.")
        }
    }

    const handleBarCodeScanned = ({data}) => {
        setScanned(true);
        setCardId(data);
    };

    const handleUserIdChange = (e) => {
        setCardId(e.target.value);
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={style.container}>
            <View style={{justifyContent: 'flex-start', flex: 1, backgroundColor: '#fff'}}>
                <Center w="100%">
                    <Box safeArea px="2" py={0} w="90%" maxW="500">
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            {(hasPermission === false) ? (
                                <VStack space={3} mt={3}>
                                    <Alert w="100%" colorScheme={'warning'} status={'warning'}>
                                        <Text>Kein Zugriff auf die Kamera. Bitte erlauben Sie diesen in den
                                            Systemeinstellungen um Zugriff auf den QR-Code Scanner zu erhalten.</Text>
                                    </Alert>
                                </VStack>
                            ) : (
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
                            )}
                        </TouchableWithoutFeedback>
                        <VStack space={3} mt={1}>
                            <View style={style.innerInput}>
                                <TextInput placeholder={"Nummer eingeben..."} value={cardId}
                                           onChange={handleUserIdChange} style={style.innerInputInput}/>
                                <Pressable colorScheme="primary" style={style.innerInputIcon}
                                           onPress={handleQrEntered}>
                                    <Icon name={"search"} style={style.icon}/>
                                </Pressable>
                            </View>
                        </VStack>
                    </Box>
                    <ReservationList/>
                </Center>
            </View>
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
        backgroundColor: '#cc1e1c',
        paddingHorizontal: 10,
        display: "flex",
        justifyContent: "center"
    },
    icon: {
        color: '#fff'
    }
});
export default ScanPage;
