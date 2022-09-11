import React from 'react';
import {Alert, Linking, StyleSheet} from 'react-native';
import {
    Box,
    Center, Pressable, View, Text
} from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import {useDispatch} from "react-redux";
import {Link, useNavigation} from "@react-navigation/native";
import {dispatchClearUserData} from "../redux/data/dispatcher";

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
                        dispatchClearUserData(dispatch);
                        navigation.navigate('Login');
                    }
                }
            ]
        );
    }

    const devInfo = () => {
        Linking.openURL('https://gitlab.com/projektarbeit-caritas-app');
    }

    return <View style={{backgroundColor: '#fff', flex: 1}}>
        <Box safeArea p="2" py="2" w="100%">
            <Pressable style={style.listElement} onPress={devInfo}>
                <Icon style={style.listIcon} name={'information-circle-outline'}></Icon>
                <Text>Entwicklerinformationen</Text>
            </Pressable>
            <Pressable style={style.listElement} onPress={logout}>
                <Icon style={style.listIcon} name={'exit-outline'}></Icon>
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
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc'
    },
    listIcon: {
        fontSize: 20,
        marginRight: 5
    }
});

export default SettingsPage;
