import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {Button} from "native-base";
import {useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {store} from "../redux/store";

const ShoppingCartButton = () => {
    const state = useSelector(({nonPersistantReducer}: any) => nonPersistantReducer);
    const [lineItems, setLineItems] = useState(state.lineItemReducer);
    const navigation = useNavigation();

    store.subscribe(() => {
        const lineitemReducer = store.getState().nonPersistantReducer.lineItemReducer;
        if(lineItems.length !== lineitemReducer.length)
        {
            setLineItems(lineitemReducer);
        }
    })

    return (
        <>
            {
                lineItems.length > 0 ? (
                    <View style={[style.container, style.mt, style.mb]}>
                        <Button onPress={() => navigation.navigate('ShoppingCartPage')}>Zum
                            Warenkorb</Button>
                    </View>
                ) : null
            }
        </>
    )
}

const style = StyleSheet.create({
    container: {
        width: '100%'
    },
    mt: {
        marginTop: 25
    },
    mb: {
        marginBottom: 25
    }
})

export default React.memo(ShoppingCartButton);
