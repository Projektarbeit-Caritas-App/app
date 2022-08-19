import React from 'react';
import LoginPage from "../pages/LoginPage";
import ScanPage from "../pages/ScanPage";
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from "@react-navigation/native";
import {useSelector} from "react-redux";

const Stack = createStackNavigator();

const Navigation = () => {
    const state = useSelector((state: any) => state);

    let isLoggedin = state.auth.loggedIn;

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isLoggedin ? (
                    <>
                        <Stack.Screen name={"Scan"} component={ScanPage}/>
                    </>
                ) : (
                    <>
                        <Stack.Screen name={"Login"} component={LoginPage}/>
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;
