import {Dimensions, StyleSheet} from "react-native";

const {width} = Dimensions.get('screen');

//primary: #bd583f
//secondary: #89a4a7;

export default StyleSheet.create({
    container: {
        width: width * 0.8
    },
    centerChilds: {
        display: "flex",
        alignItems: "center",
    },
    headlineText: {
        fontSize: 32
    },
    text: {
        fontSize: 14,
        color: '#89a4a7'
    },
    spaceTop: {
        marginTop: 10
    },
    form: {
        marginTop: 10,
    },
    input:{
        padding: 12,
        borderRadius: 50,
        borderColor: '#adadad',
        borderWidth: 1,
        marginTop: 5
    },
    button: {
        marginTop: 5,
        backgroundColor: '#89a4a7',
        padding: 12,
        textAlign: "center",
        borderRadius: 50
    },
    buttonText: {
        color: '#fff'
    }
})
