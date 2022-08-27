import React from 'react';
import LoginPage from "../pages/LoginPage";
import ScanPage from "../pages/ScanPage";
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from "@react-navigation/native";
import {useSelector} from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import {Text} from "native-base";
import {Pressable, StyleSheet} from "react-native";
import SettingsPage from "../pages/SettingsPage";
import CardPage from "../pages/CardPage";

const Stack = createStackNavigator();

const Navigation = () => {
    const navigation = useNavigation();

    const state = useSelector((state: any) => state);
    console.log(state); //todo: Debug entfernen
    console.log('state.userReducer'); //todo: Debug entfernen
    console.log(state.userReducer); //todo: Debug entfernen
    let isLoggedin = (state.userReducer !== null && state.userReducer.token.length > 0);

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
                            <Pressable onPress={() => navigation.navigate('Settings')}><Icon
                                name={"gear"} style={[style.spacing, style.icon]}/></Pressable>
                        ),
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
        marginRight: 15,
        marginLeft: 15
    },
    icon: {
        fontSize: 20
    }
})

export default Navigation;
