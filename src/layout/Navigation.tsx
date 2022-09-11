import React from 'react';
import LoginPage from "../pages/LoginPage";
import ScanPage from "../pages/ScanPage";
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from "@react-navigation/native";
import {useSelector} from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import {Text} from "native-base";
import {Pressable, StyleSheet, View} from "react-native";
import SettingsPage from "../pages/SettingsPage";
import CardPage from "../pages/CardPage";
import ShoppingCartPage from "../pages/ShoppingCartPage";
import {LineItem} from "../redux/data/models";
import {red} from "react-native-reanimated/lib/types/lib/reanimated2";

const Stack = createStackNavigator();

const Navigation = () => {
    const navigation = useNavigation();
    const persistantReducer = useSelector(({persistantReducer}: any) => persistantReducer);
    const nonPersistantReducer = useSelector(({nonPersistantReducer}: any) => nonPersistantReducer);
    const getCartItemAmount =  (lineItems: LineItem[] | []) =>{
        let amount = 0;
        lineItems.forEach((lineItem) => {
            amount += lineItem.amount;
        })
        return amount;
    }


    const cartItems = getCartItemAmount(nonPersistantReducer.lineItemReducer);
    const isLoggedin = (persistantReducer.user !== null && persistantReducer.token.length > 0);

    return (
        <>
            {isLoggedin ? (<Stack.Navigator>
                    <Stack.Screen name={"ScanPage"} component={ScanPage} options={{
                        headerTitle: 'Karte scannen',
                        headerRight: () => (
                            <Pressable onPress={() => navigation.navigate('Settings')}><Icon
                                name={"gear"} style={[style.spacing, style.icon]}/></Pressable>
                        ),
                    }}/>
                    <Stack.Screen name={"CardPage"} component={CardPage} options={{
                        headerTitle: 'Kartenansicht',
                        headerRight: () => (
                            <Pressable onPress={() => navigation.navigate('ShoppingCartPage')}>
                                <View style={[style.parent, style.spacing]}>
                                    <Icon name={"shopping-cart"} style={style.icon}/>
                                    {cartItems > 0 ? (<Text style={style.amount}>{cartItems}</Text>): null}
                                </View>
                            </Pressable>
                        ),
                    }}/>
                    <Stack.Screen name={"ShoppingCartPage"} component={ShoppingCartPage} options={{
                        headerTitle: 'Warenkorb'
                    }}/>
                    <Stack.Screen name={"Settings"} component={SettingsPage} options={{
                        headerTitle: 'Einstellungen',
                        headerLeft: () => (
                            <Pressable onPress={() => navigation.navigate('ScanPage')}><Text
                                style={style.spacing}><Icon name={"chevron-left"}/>
                                <Text>Back</Text></Text></Pressable>
                        )
                    }}/>
                </Stack.Navigator>
            ) : (<Stack.Navigator screenOptions={{
                headerShown: false,
            }}>
                <Stack.Screen name={"Login"} component={LoginPage}/>
            </Stack.Navigator>)}
        </>
    );
}

const style = StyleSheet.create({
    spacing: {
        marginRight: 20,
        marginLeft: 20
    },
    icon: {
        fontSize: 20
    },
    parent: {
        position: "relative",
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    amount: {
        position: "absolute",
        top: -5,
        right: -8,
        zIndex: 2,
        backgroundColor: '#cc1e1c',
        color: '#fff',
        borderRadius: 7.5,
        width: 15,
        height: 15,
        textAlign: 'center',
        fontSize: 10,
        lineHeight: 15
    }
})

export default Navigation;
