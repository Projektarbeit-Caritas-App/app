import {Box, Button, Center, CheckIcon, Heading, Select, Text, View} from "native-base";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getReservationsForShop, getShops} from "../redux/data/api";
import {dispatchSetShop} from "../redux/data/dispatcher";
import {FlatList, SafeAreaView, StyleSheet} from "react-native";
import {format} from 'date-fns'

const ReservationList = () => {
    const [shops, setShops] = useState([]);
    const [shopId, setShopId] = useState<any>(null);
    const [reservations, setReservations] = useState([]);
    const userStore = useSelector(({persistantReducer}: any) => persistantReducer);
    const dispatch = useDispatch();

    console.log('userStore'); //todo: Debug entfernen
    console.log(userStore); //todo: Debug entfernen

    const handleShopIdChange = (shopId: any) => {
        console.log('set'); //todo: Debug entfernen
        console.log(shopId); //todo: Debug entfernen
        setShopId(shopId);
    }

    const changeShopId = () => {
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
        } else if (userStore.shop > 0 && reservations.length === 0) {
            //Load shops
            getReservationsForShop(userStore.shop, config, dispatch).then((reservations: any) => {
                console.log(reservations); //todo: Debug entfernen
                setReservations(reservations);
            })
        }
        console.log('useEffect'); //todo: Debug entfernen
    })

    //{name} ({Ort}, {Straße})
    const renderItem = ({ item }) => (
        <View>
            <Text>{format(new Date(item.time), 'HH:mm')} Uhr: {item.card.last_name}, {item.card.first_name} {item.card_id}</Text>
        </View>
    );

    return (
        <View style={style.mtbig}>
            <Center>
                {userStore.shop === null?(
                    <Box maxW="500">
                        <Select selectedValue={shopId} minWidth="200" accessibilityLabel="Choose Service"
                                placeholder="Laden wählen" _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5"/>
                        }} mt={1} onValueChange={itemValue => handleShopIdChange(itemValue)}>
                            {shops.map((singleShop: any) => <Select.Item label={singleShop.city} value={singleShop.id}
                                                                         key={singleShop.id}/>)}
                        </Select>
                        <Button onPress={() => (changeShopId())} style={style.mtsmall}>Laden speichern</Button>
                    </Box>
                ):(
                    <Box maxW="500">
                        <Heading size="md">Heutige Reservierungen</Heading>
                        {reservations.length === 0?(
                            <Text>Keine Reservierungen vorhanden.</Text>
                        ):(
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
    mtsmall: {
        marginTop: 5
    },
    mtbig: {
        marginTop: 25
    }
});

export default ReservationList;
