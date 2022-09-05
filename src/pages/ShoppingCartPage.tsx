import {Box, Button, Heading, HStack, Image, Pressable, Stack, Text} from "native-base";
import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {LineItem} from "../redux/data/models";
import {SafeAreaView, SectionList, StyleSheet, View} from "react-native";
import RepetetiveImage from "../components/RepetetiveImage";
import {getIcon} from "../services/image";
import {orderLineItems} from "../redux/data/api";

const ShoppingCartPage = () => {
    const state = useSelector(({nonPersistantReducer}: any) => nonPersistantReducer);
    const persistantReducer = useSelector(({persistantReducer}: any) => persistantReducer);
    const lineItems = state.lineItemReducer;
    const cartView = state.cartViewReducer;
    const dispatch = useDispatch();

    // @ts-ignore
    const Item = ({data, index, section}) => {
        console.log('data'); //todo: Debug entfernen
        console.log(data); //todo: Debug entfernen
        const iconSource = getIcon(data.product_type.icon);
        return (
            <View style={style.item}>
                <Text style={style.itemText}>{data.amount}x{data.product_type.name} <Image source={iconSource} alt={data.product_type.name}
                                                                    style={style.icon}
                                                                    resizeMode="contain"></Image></Text>
            </View>
        )
    };

    const submitOrder = () => {
        const config = {
            headers: {Authorization: `Bearer ${persistantReducer.token}`}
        };
        orderLineItems(cartView.card.id, {lineItems: lineItems}, config, dispatch).then((result) => {

        })
        console.log('SUBMIT'); //todo: Debug entfernen
    }

    return (
        <Box alignItems="center" mx={4}>
            {lineItems.length > 0 ? (
                <>
                    <Box rounded="lg" width={'100%'} overflow="hidden" borderColor="coolGray.200" borderWidth="1" m={4}
                         _dark={{
                             borderColor: "coolGray.600",
                             backgroundColor: "gray.700"
                         }} _web={{
                        shadow: 2,
                        borderWidth: 0
                    }} _light={{
                        backgroundColor: "gray.50"
                    }}>
                        <Stack p="4" space={0}>
                            <Stack space={2}>
                                <Heading size="md"
                                         ml="-1">{cartView.card.last_name}, {cartView.card.first_name}</Heading>
                                <Text fontSize="xs" _light={{
                                    color: "violet.500"
                                }} _dark={{
                                    color: "violet.400"
                                }} fontWeight="500" ml="-0.5" mt="-1">Nr: {cartView.card.id}</Text>
                            </Stack>
                        </Stack>
                    </Box>
                    <View style={style.container}>
                        <SafeAreaView>
                            <SectionList
                                sections={cartView.persons}
                                keyExtractor={(item, index) => item + index}
                                renderItem={({item, index, section}) => <Item data={item} index={index}
                                                                              section={section}/>}
                                renderSectionHeader={({section: {age, gender}}) => (
                                    <Text style={style.heading}>{age} Jahre, {gender}</Text>
                                )}
                            />
                        </SafeAreaView>
                    </View>
                    <View style={[style.container, style.mt]}>
                        <Button onPress={() => submitOrder()}>Jetzt buchen</Button>
                    </View>
                </>
            ) : (
                <Text>Keine Elemente im Warenkorb.</Text>
            )}
        </Box>
    )
}

const style = StyleSheet.create({
    heading: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        backgroundColor: '#fff',
        fontWeight: '600',
        fontSize: 18,
        marginTop: 10,
        padding: 10
    },
    container: {
        width: '100%'
    },
    inline: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    item: {
        backgroundColor: '#fff',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    itemText:{
        fontSize: 16
    },
    actionsText: {
        fontSize: 20,
        lineHeight: 20,
        paddingVertical: 5,
        paddingHorizontal: 8,
    },
    typeText: {
        minWidth: 200
    },
    actions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    icon: {
        width: 20,
        height: 20
    },
    mt: {
        marginTop: 25
    }
});

export default ShoppingCartPage;
