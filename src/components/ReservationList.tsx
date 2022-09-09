import {Box, Button, Center, CheckIcon, Heading, Select, Text, View} from "native-base";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCardByID, getReservationsForShop, getShops} from "../redux/data/api";
import {dispatchSetShop} from "../redux/data/dispatcher";
import {FlatList, Pressable, SafeAreaView, StyleSheet} from "react-native";
import {format} from 'date-fns'
import {useNavigation} from "@react-navigation/native";

const ReservationList = () => {
    const [shops, setShops] = useState([]);
    const [shopId, setShopId] = useState<any>('');
    const [reservations, setReservations] = useState([]);
    const [reservationsLoaded, setReservationsLoaded] = useState(false);
    const userStore = useSelector(({persistantReducer}: any) => persistantReducer);
    const dispatch = useDispatch();
    const state = useSelector(({persistantReducer}: any) => persistantReducer);
    const navigation = useNavigation();

    const setShopInStore = () => {
        dispatchSetShop(dispatch, shopId);
    }

    useEffect(() => {
        const config = {
            headers: {Authorization: `Bearer ${userStore.token}`}
        };
        if (userStore.shop === null && shops.length === 0) {
            //Load shops
            getShops(config, dispatch).then((shops: any) => {
                setShops(shops);
            })
        } else if (userStore.shop > 0 && reservationsLoaded) {
            //Load shops
            getReservationsForShop(userStore.shop, config, dispatch).then((reservations: any) => {
                console.log(reservations); //todo: Debug entfernen
                setReservations(reservations);
                setReservationsLoaded(true);
            })
        }
        console.log('useEffect'); //todo: Debug entfernen
    })

    const handleQrEntered = (cardId: string) => {
        const config = {
            headers: {Authorization: `Bearer ${state.token}`}
        };

        getCardByID(parseInt(cardId), config, dispatch).then((res: any) => {
            if (res.persons !== undefined) {
                navigation.navigate('CardPage', {data: res})
            }
        }).catch(() => {
            alert("Der eingegebene oder gescannte QR Code konnte keinem Benutzer zugeordnet werden. Bitte überprüfen Sie Ihre Eingabe.")
        })
    }

    //{name} ({Ort}, {Straße})
    const renderItem = ({item}) => (
        <View style={style.item}>
            <Pressable onPress={() => handleQrEntered(item.card_id)}>
                <Text style={style.itemText}><Text
                    style={style.itemStrong}>{format(new Date(item.time), 'HH:mm')} Uhr:</Text> {item.card.last_name}, {item.card.first_name} {item.card_id}
                </Text>
            </Pressable>
        </View>
    );

    return (
        <View style={[style.mtbig, style.reservationList]} w="100%" maxW={500}>
            <Center>
                {userStore.shop === null ? (
                    <Box w="100%">
                        <Select selectedValue={shopId} minWidth="200" accessibilityLabel="Laden wählen"
                                placeholder="Laden wählen" _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5"/>
                        }} mt={1} onValueChange={itemValue => setShopId(itemValue)}>
                            {shops.map((singleShop: any) => <Select.Item label={singleShop.city} value={singleShop.id.toString()}
                                                                         key={singleShop.id}/>)}
                        </Select>
                        <Button onPress={() => (setShopInStore())} style={style.mtsmall}>Laden speichern</Button>
                    </Box>
                ) : (
                    <Box w="100%">
                        <Heading size="md">Heutige Reservierungen</Heading>
                        {reservations.length === 0 ? (
                            <Text>Keine Reservierungen vorhanden.</Text>
                        ) : (
                            <SafeAreaView>
                                <FlatList
                                    data={reservations}
                                    renderItem={renderItem}
                                    keyExtractor={(item: any) => item.id}
                                />
                            </SafeAreaView>
                        )}
                    </Box>
                )}
            </Center>
        </View>
    )
}

const style = StyleSheet.create({
    reservationList:{
      padding: 5
    },
    mtsmall: {
        marginTop: 5
    },
    mtbig: {
        marginTop: 25
    },
    item: {
        padding: 5,
        backgroundColor: '#fff3f3',
        borderRadius: 5,
        marginBottom: 2
    },
    itemStrong: {
        fontWeight: '600'
    },
    itemText: {
        fontSize: 16
    }
});

export default ReservationList;
