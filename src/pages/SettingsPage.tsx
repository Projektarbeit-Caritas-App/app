import React from 'react';
import {Alert, Linking, StyleSheet} from 'react-native';
import {
    Box,
    Center, Pressable, View, Text
} from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import {useDispatch} from "react-redux";
import { clearUserData } from '../redux/data/user';
import {Link, useNavigation} from "@react-navigation/native";

const SettingsPage = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const logout = () => {
        Alert.alert(
            "Abmelden",
            "Möchten Sie sich wirklich abmelden?",
            [
                {
                    text: "Abbrechen",
                    style: "cancel"
                },
                {
                    text: "Abmelden", onPress: () => {
                        dispatch(clearUserData());
                        navigation.navigate('Login');
                    }
                }
            ]
        );
    }

    const devInfo = () => {
        Linking.openURL('https://gitlab.com/projektarbeit-caritas-app');
    }

    return <View style={{backgroundColor: '#fff'}}>
        <Box safeArea p="2" py="2" w="90%" maxW="500">
            <Pressable style={style.listElement} onPress={devInfo}>
                <Icon name={'information-circle-outline'}></Icon>
                <Text>Entwicklerinformationen</Text>
            </Pressable>
            <Pressable style={style.listElement} onPress={logout}>
                <Icon name={'exit-outline'}></Icon>
                <Text>Abmelden</Text>
            </Pressable>
        </Box>
    </View>;
};


const style = StyleSheet.create({
    image: {
        width: '100%',
        marginBottom: 20
    },
    listElement: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
    }
});

export default SettingsPage;
