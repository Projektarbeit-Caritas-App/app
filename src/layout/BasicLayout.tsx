import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from "../pages/LoginPage";
import ScanPage from "../pages/ScanPage";
const Stack = createNativeStackNavigator();

const BasicLayout = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={LoginPage} />
                <Stack.Screen name="Scan" component={ScanPage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default BasicLayout;
