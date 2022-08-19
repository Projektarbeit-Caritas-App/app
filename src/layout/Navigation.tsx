import React from 'react';
import LoginPage from "../pages/LoginPage";
import ScanPage from "../pages/ScanPage";
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from "@react-navigation/native";
import {useSelector} from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import {Text} from "native-base";
import {StyleSheet} from "react-native";

const Stack = createStackNavigator();

const Navigation = () => {
    const state = useSelector((state: any) => state);
    console.log(state); //todo: Debug entfernen
    console.log(state.userReducer); //todo: Debug entfernen
    let isLoggedin = (state.userReducer.token.length > 0);

    return (
        <>
            <NavigationContainer>
                {isLoggedin ? (<Stack.Navigator>
                        <Stack.Screen name={"Ansicht der Karte"} component={ScanPage} options={{
                            headerRight: () => (
                                <Icon name={"gear"} style={[style.spacing, style.icon]}/>
                            ),
                        }}/>
                        <Stack.Screen name={"Einstellungen"} component={ScanPage} options={{
                            headerLeft: () => (
                                <Text style={style.spacing}><Icon name={"chevron-left"}/> <Text>Back</Text></Text>
                            ),
                            headerRight: () => (
                                <Icon name={"gear"} style={[style.spacing, style.icon]}/>
                            ),
                        }}/>
                    </Stack.Navigator>
                ) : (<Stack.Navigator screenOptions={{
                    headerShown: false,
                }}>
                    <Stack.Screen name={"Login"} component={LoginPage}/>
                </Stack.Navigator>)}
            </NavigationContainer>
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
